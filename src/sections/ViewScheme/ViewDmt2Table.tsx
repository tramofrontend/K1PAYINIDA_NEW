import {
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  CardProps,
  TableContainer,
  Typography,
  Stack,
} from "@mui/material";
import { useEffect } from "react";
import Scrollbar from "src/components/scrollbar/Scrollbar";
import { TableHeadCustom } from "src/components/table";
import { useAuthContext } from "src/auth/useAuthContext";
import { Dmt2RowProps } from "./types";

// ----------------------------------------------------------------------

interface Props extends CardProps {
  comData: Dmt2RowProps[];
}

export default function ViewDmt2able({ comData, ...other }: Props) {
  const { user } = useAuthContext();

  const tableLabels1 = [
    { id: "min", label: "Min. Slab" },
    { id: "max", label: "Max. Slab" },
    { id: "max", label: "CCF Type" },
    { id: "max", label: "CCF" },
    { id: "AgentCommissionType", label: "Agent Commission Type" },
    { id: "AgentCommission", label: "Agent Commission" },
    { id: "DistributorComType", label: "Distributor Commission type" },
    { id: "Distributor", label: "Distributor Commission" },
    { id: "MDistributorType", label: "MasterDistributor Commission Type" },
    { id: "MDistributor", label: "Master Distributor Commission" },
  ];
  const tableLabels2 = [
    { id: "min", label: "Min. Slab" },
    { id: "max", label: "Max. Slab" },
    { id: "max", label: "CCF Type" },
    { id: "max", label: "CCF" },
    { id: "AgentCommissionType", label: "Agent Commission Type" },
    { id: "AgentCommission", label: "Agent Commission" },
    { id: "DistributorComType", label: "Distributor Commission type" },
    { id: "Distributor", label: "Distributor Commission" },
  ];
  const tableLabels3 = [
    { id: "min", label: "Min. Slab" },
    { id: "max", label: "Max. Slab" },
    { id: "max", label: "CCF Type" },
    { id: "max", label: "CCF" },
    { id: "AgentCommissionType", label: "Agent Commission Type" },
    { id: "AgentCommission", label: "Agent Commission" },
  ];
  let role = user?.role;

  return (
    <Card {...other}>
      {comData.length ? (
        <TableContainer sx={{ overflow: "unset" }}>
          <Scrollbar>
            <Table sx={{ minWidth: 720 }}>
              <TableHeadCustom
                headLabel={
                  role == "m_distributor"
                    ? tableLabels1
                    : role == "distributor"
                    ? tableLabels2
                    : tableLabels3
                }
              />
              <TableBody>
                {comData.map((row: Dmt2RowProps, index: any) => (
                  <VendorRow key={row._id} row={row} agentRole={role} />
                ))}
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>
      ) : (
        <NoData />
      )}
    </Card>
  );
}

type vendorRowProps = {
  row: Dmt2RowProps;
  agentRole: string | null;
};
// sd
function VendorRow({ row, agentRole }: vendorRowProps) {
  return (
    <>
      <TableRow>
        <TableCell>{row.minSlab}</TableCell>
        <TableCell>{row.maxSlab}</TableCell>
        <TableCell>
          {row.ccfType == "flat"
            ? "Rs."
            : row.ccfType == "percentage"
            ? "%"
            : "-"}
        </TableCell>
        <TableCell>{row.ccf}</TableCell>
        <TableCell>
          {row.agentCommissionType == "flat"
            ? "Rs."
            : row.agentCommissionType == "percentage"
            ? "%"
            : "-"}
        </TableCell>
        <TableCell>{row.agentCommission}</TableCell>

        {agentRole == "distributor" && (
          <>
            <TableCell>
              {" "}
              {row.distributorCommissionType == "flat"
                ? "Rs."
                : row.distributorCommissionType == "percentage"
                ? "%"
                : "-"}
            </TableCell>
            <TableCell>{row.distributorCommission || "-"}</TableCell>
          </>
        )}
        {agentRole == "m_distributor" && (
          <>
            <TableCell>
              {" "}
              {row.distributorCommissionType == "flat"
                ? "Rs."
                : row.distributorCommissionType == "percentage"
                ? "%"
                : "-"}
            </TableCell>
            <TableCell>{row.distributorCommission || "-"}</TableCell>
            <TableCell>
              {" "}
              {row.masterDistributorCommissionType == "flat"
                ? "Rs."
                : row.masterDistributorCommissionType == "percentage"
                ? "%"
                : "-"}
            </TableCell>
            <TableCell>{row.masterDistributorCommission || "-"}</TableCell>
          </>
        )}
      </TableRow>
    </>
  );
}

function NoData() {
  return (
    <Stack justifyContent={"center"} p={2}>
      <Typography textAlign={"center"} fontSize={25}>
        {" "}
        Scheme Not Created for DMT1. Please Contact to Admin.
      </Typography>
    </Stack>
  );
}
