import {withStyles, makeStyles, useTheme} from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from "@material-ui/core/TableRow";


export const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 20,
  },
  body: {
    fontSize: 20,
  },
}))(TableCell);


export const StyledTableCellForStatus = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 30,
    fontWeight: "bold",
    // border : "2px solid white"
  },
  body: {
    fontSize: 20,
    width:"300px",
    border : "2px solid black"
  },
}))(TableCell);

export const StyledBottomTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 15,
    fontWeight: "bold",
    // border : "2px solid white"
  },
  body: {
    fontSize: 20,
    fontWeight: "bold",
    border : "1px solid black",
    width:"200px",
  },
}))(TableCell);

export const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
