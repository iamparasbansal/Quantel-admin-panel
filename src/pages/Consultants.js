import React from 'react';
import PropTypes from 'prop-types';
import { lighten, makeStyles, withStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import EditIcon from '@material-ui/icons/Edit';
import MoreIcon from '@material-ui/icons/More';
import axios from 'axios';
import {Link} from 'react-router-dom';
import '../static/Consultant.css';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    border: '1px solid rgba(255, 255, 255, 0.3)',
    fontSize: 18,
  },
  body: {
    fontSize: 18,
    border: '1px solid rgba(0, 0, 0, 0.1)',
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: "rgb(214, 214, 214)",
    },
  },
}))(TableRow);

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'name', text: true, disablePadding: false, label: 'Names' },
  { id: 'NickName', text: true, disablePadding: false, label: 'NickName' },
  { id: 'email', text: true, disablePadding: false, label: 'Email' },
  { id: 'phone', text: true, disablePadding: false, label: 'Phone' },
  { id: 'website', text: true, disablePadding: false, label: 'Website' },
  { id: 'action', text: true, disablePadding: false, label: 'Action' }
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
      <TableHead>
      <StyledTableRow>
        <StyledTableCell padding="checkbox">
        </StyledTableCell>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={headCell.text ? 'left' : 'right'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              style={{color: 'white'}}
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </StyledTableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: '1 1 100%',
    fontSize: 30,
  },

}));

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

let consultants_array = [];
export default function EnhancedBookingTable() {
  const classes = useStyles();
  const classes2 = useToolbarStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('NickName');
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [consultantsPerPage, setConsultantPerPage] = React.useState(5);
  const [consultants, setConsultant]= React.useState([]);
  const[search, setSearch]=React.useState("");
  const[searchColumns, setSearchColumns]= React.useState([]);

  React.useEffect(()=>{
      if (search.length) {
        if(searchColumns.length){
          setConsultant(
          consultants_array.filter(Consultant =>
              searchColumns.some(
                (column)=> Consultant[column].toString().toLowerCase().includes(search.toLowerCase())
              )
            )
          )
        }
        else{
          window.alert("Please Select atleast one field to Search")
        }
      }else{
        setConsultant(consultants_array)
      }
    }, [search]);

  React.useEffect(()=>{
    loadConsultants();
  },[])

  const loadConsultants= async()=>{
      const result =await axios.get("http://localhost:3001/Consultants");
      consultants_array=result.data.reverse();
      setConsultant(consultants_array);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setConsultantPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const emptyRows = consultantsPerPage - Math.min(consultantsPerPage, consultants_array.length - page * consultantsPerPage);
  const columns= consultants[0] && Object.keys(consultants[0]);

  const deleteUser=async id => {
    await axios.delete(`http://localhost:3001/Consultants/${id}`);
    loadConsultants();
  }

  return (
    <div className="Consultant-page-container">
      <div className={classes.root}>
        <Paper elevation={5} className={classes.paper}>
          <Toolbar>
            <Typography className={classes2.title} variant="h6" id="tableTitle" component="div">
              Consultants
            </Typography>
            <Tooltip title="Filter list">
              <IconButton aria-label="filter list">
                <FilterListIcon />
              </IconButton>
            </Tooltip>
            <input style={{paddingLeft:'1vh', paddingRight:'1vh', paddingTop:'0.5vh', paddingBottom:'0.5vh'}}
              placeholder=" Search....."
              onChange={e=>setSearch(e.target.value)}
            />
            {
              columns && columns.map(column=> <span style={{padding: '1rem', whiteSpace: 'nowrap', fontSize:'20px'}}>
                <input type="checkbox" checked={searchColumns.includes(column)}
                    onChange={(e)=>{
                        const checked= searchColumns.includes(column)
                        setSearchColumns(prev=>checked
                            ? prev.filter(sc=>sc!== column)
                            : [...prev, column]
                        );
                    }}
                />
                  &nbsp;{column}
                </span> 
                )
            } 
          </Toolbar>
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={consultants.length}
              />
              <TableBody>
                {stableSort(consultants, getComparator(order, orderBy))
                  .slice(page * consultantsPerPage, page * consultantsPerPage + consultantsPerPage)
                  .map((consultant, index) => {

                    return (
                      <StyledTableRow>
                        <StyledTableCell align="left">{(page*consultantsPerPage)+index+1}</StyledTableCell>
                        <StyledTableCell align="left">
                          {consultant.name}
                        </StyledTableCell>
                        <StyledTableCell align="left">{consultant.NickName}</StyledTableCell>
                        <StyledTableCell align="left">{consultant.email}</StyledTableCell>
                        <StyledTableCell align="left">{consultant.phone}</StyledTableCell>
                        <StyledTableCell align="left">{consultant.website}</StyledTableCell>
                        <StyledTableCell align="left">
                        <Link to={`/Consultants/view/${consultant.id}`}>
                          <Tooltip title="View More">
                            <IconButton aria-label="view more">
                              <MoreIcon/>
                            </IconButton>
                          </Tooltip>
                        </Link>
                        <Link to={`/Consultants/edit/${consultant.id}`}>
                          <Tooltip title="Edit">
                            <IconButton aria-label="edit">
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                        </Link>
                        <Tooltip title="Delete">
                          <IconButton aria-label="delete">
                            <DeleteIcon onClick={()=>{
                              if (window.confirm('Are you sure you wish to delete this Consultant Data?'))
                                deleteUser(consultant.id)
                            }}/>
                          </IconButton>
                        </Tooltip>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <StyledTableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <StyledTableCell colSpan={6} />
                  </StyledTableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={consultants.length}
            rowsPerPage={consultantsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </div> 
    </div>
  );
}
