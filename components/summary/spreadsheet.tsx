import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Button } from "react-bootstrap";
import styles from "../../styles/Summary.module.css";
import { CSVLink } from "react-csv";

interface Column {
  id:
    | "date"
    | "day"
    | "shiftTime"
    | "totalHours"
    | "hourlyWages"
    | "cashTips"
    | "ccTips"
    | "totalTips";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

interface spreadDateSelectorProps {
  rows_filtered: any[];
  startDate: Date;
  endDate: Date;
}

const columns: Column[] = [
  { id: "date", label: "Date", minWidth: 170 },
  { id: "day", label: "Day", minWidth: 100 },
  { id: "shiftTime", label: "Shift Time", minWidth: 100 },
  { id: "totalHours", label: "Total Hours", minWidth: 100 },
  { id: "hourlyWages", label: "Hourly Wages", minWidth: 100 },
  { id: "cashTips", label: "Cash Tips", minWidth: 100 },
  { id: "ccTips", label: "Credit Card Tips", minWidth: 100 },
  { id: "totalTips", label: "Total Tips", minWidth: 100 },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

export default function StickyHeadTable({
  rows_filtered,
  startDate,
  endDate,
}: spreadDateSelectorProps) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows_filtered
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.date}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <CSVLink
          data={rows_filtered}
          filename={
            "TipTracker-" +
            startDate.toDateString() +
            "-" +
            endDate.toDateString() +
            ".csv"
          }
        >
          <Button variant="outline-dark" className={styles.buttonSpreadsheet}>
            Export
          </Button>
        </CSVLink>
        <TablePagination
          rowsPerPageOptions={[7, 14, 21]}
          component="div"
          count={rows_filtered.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </div>
    </Paper>
  );
}
