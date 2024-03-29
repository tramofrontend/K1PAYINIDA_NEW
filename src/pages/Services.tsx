import { Helmet } from "react-helmet-async";
import React, { useEffect, useState } from "react";
import { Tab, Tabs, Box, Grid } from "@mui/material";
import { Api } from "src/webservices";
import {
  AEPS,
  DMT,
  DMT1,
  DMT2,
  IndoNepal,
  MATM,
  AadharPay,
  BillPayment,
  Recharges,
} from "../sections/services";
import ServiceUnderUpdate from "./ServiceUnderUpdate";

// ----------------------------------------------------------------------

export const CategoryContext = React.createContext({});

export default function Services(props: any) {
  const [categoryList, setCategoryList] = useState([]);
  const [superCurrentTab, setSuperCurrentTab] = useState("");

  useEffect(() => {
    setSuperCurrentTab(props.title);
  }, [props.title]);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = () => {
    let token = localStorage.getItem("token");
    Api(`category/get_CategoryList`, "GET", "", token).then((Response: any) => {
      console.log("======getcategory_list====>", Response);
      if (Response.status == 200) {
        if (Response.data.code == 200) {
          const sortedData = Response?.data?.data.filter((item: any) => {
            if (
              item?.category_name.toLowerCase() === "money transfer" ||
              item?.category_name.toLowerCase() === "aeps" ||
              item?.category_name.toLowerCase() === "aadhaar pay" ||
              item?.category_name.toLowerCase() === "recharges" ||
              item?.category_name.toLowerCase() === "bill payment" ||
              item?.category_name.toLowerCase() === "dmt2" ||
              item?.category_name.toLowerCase() === "dmt1"
            ) {
              return item;
            }
          });
          setCategoryList(sortedData);
          setSuperCurrentTab(sortedData[0].category_name);
        } else {
        }
      }
    });
  };

  return (
    <>
      <Helmet>
        <title> Recharges | {process.env.REACT_APP_COMPANY_NAME} </title>
      </Helmet>
      <Grid>
        <Tabs
          value={superCurrentTab}
          variant="scrollable"
          sx={{ background: "#F4F6F8" }}
          onChange={(event, newValue) => setSuperCurrentTab(newValue)}
          aria-label="icon label tabs example"
        >
          {categoryList.map((tab: any) => (
            <Tab
              key={tab._id}
              sx={{ mx: { xs: 0.5, sm: 2 }, fontSize: { xs: 12, sm: 16 } }}
              label={tab.category_name}
              iconPosition="top"
              value={tab.category_name}
            />
          ))}
        </Tabs>

        {categoryList.map(
          (tab: any) =>
            tab.category_name == superCurrentTab && (
              <CategoryContext.Provider value={tab} key={tab.category_name}>
                <Box sx={{ m: 1 }}>
                  {superCurrentTab.toLowerCase() == "recharges" ? (
                    <Recharges />
                  ) : // <ServiceUnderUpdate />
                  superCurrentTab.toLowerCase() == "money transfer" ? (
                    <DMT />
                  ) : superCurrentTab.toLowerCase() == "aeps" ? (
                    <AEPS supCategory={tab} />
                  ) : superCurrentTab.toLowerCase() == "indo nepal" ? (
                    <IndoNepal supCategory={tab} />
                  ) : superCurrentTab.toLowerCase() == "bill payment" ? (
                    <BillPayment supCategory={tab} />
                  ) : superCurrentTab.toLowerCase() == "aadhaar pay" ? (
                    // <AadharPay supCategory={tab} />
                    <ServiceUnderUpdate />
                  ) : superCurrentTab.toLowerCase() == "matm" ? (
                    <MATM supCategory={tab} />
                  ) : superCurrentTab.toLowerCase() == "dmt1" ? (
                    <DMT1 />
                  ) : // <ServiceUnderUpdate />
                  superCurrentTab.toLowerCase() == "dmt2" ? (
                    <DMT2 />
                  ) : null}
                </Box>
              </CategoryContext.Provider>
            )
        )}
      </Grid>
    </>
  );
}
