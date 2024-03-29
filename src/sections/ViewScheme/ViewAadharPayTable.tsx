// @mui
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
import { useAuthContext } from "src/auth/useAuthContext";
import Scrollbar from "src/components/scrollbar/Scrollbar";
import { TableHeadCustom } from "src/components/table";
import { AadhaarPayeRowProps } from "./types";

// ----------------------------------------------------------------------

interface Props extends CardProps {
  comData: AadhaarPayeRowProps[];
}
export default function ViewAadharPayTable({ comData, ...other }: Props) {
  const { user } = useAuthContext();
  const tableLabels1 = [
    { id: "min", label: "Min. Slab" },
    { id: "max", label: "Max. Slab" },
    { id: "chargeType", label: "Charge Type" },
    { id: "agcharge", label: "Agent Charge" },
    { id: "Commissiontype", label: "Commission type" },
    { id: "Distributor", label: "Distributor Commission" },
    { id: "MDistributor", label: "Master Distributor Commission" },
  ];
  const tableLabels2 = [
    { id: "min", label: "Min. Slab" },
    { id: "max", label: "Max. Slab" },
    { id: "chargeType", label: "Charge Type" },
    { id: "agcharge", label: "Agent Charge" },
    { id: "Commissiontype", label: "Commission type" },
    { id: "Distributor", label: "Distributor Commission" },
  ];
  const tableLabels3 = [
    { id: "min", label: "Min. Slab" },
    { id: "max", label: "Max. Slab" },
    { id: "chargeType", label: "Charge Type" },
    { id: "agcharge", label: "Agent Charge" },
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
                {comData.map((row: AadhaarPayeRowProps, index: any) => (
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
  row: AadhaarPayeRowProps;
  agentRole: string | null;
};
// sd
function VendorRow({ row, agentRole }: vendorRowProps) {
  return (
    <>
      <TableRow>
        <TableCell>₹{row.minSlab ? row.minSlab : "-"}</TableCell>
        <TableCell>₹{row.maxSlab ? row.maxSlab : "-"}</TableCell>
        <TableCell>
          {row.chargeType == "flat"
            ? "Rs."
            : row.chargeType == "percentage"
            ? "%"
            : "-"}
        </TableCell>
        <TableCell>{row.agentCharge || "-"}</TableCell>

        {agentRole == "m_distributor" && (
          <>
            <TableCell>
              {row.commissionType == "flat"
                ? "Rs."
                : row.commissionType == "percentage"
                ? "%"
                : "-"}
            </TableCell>
            <TableCell>{row.distributorCommission || "-"}</TableCell>
            <TableCell>{row.masterDistributorCommission || "-"}</TableCell>
          </>
        )}
        {agentRole == "distributor" && (
          <>
            <TableCell>
              {row.commissionType == "flat"
                ? "Rs."
                : row.commissionType == "percentage"
                ? "%"
                : "-"}
            </TableCell>
            <TableCell>{row.distributorCommission || "-"}</TableCell>
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
        Scheme Not Created for Aadhar Pay. Please Contact to Admin.
      </Typography>
    </Stack>
  );
}
