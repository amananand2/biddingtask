import React,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {connect} from "react-redux";
import {customerApiStart} from "./action";
import { CardHeader } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
// import { Pagination } from '@material-ui/lab';
import Pagination from "@material-ui/lab/Pagination";
import ToggleButton from '@material-ui/lab/ToggleButton';
import DoneSharpIcon from '@material-ui/icons/DoneSharp';
// import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    // maxWidth: 500,
    width:"1200",
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

  MarginFromTop:{
    marginTop:"10%",
  },
  heading:{
    marginTop:"5%",
    textAlign:"center",
  },

  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
cardStyle:{
  width:"33.3%",
  textAlign:"center"

},
cardHeader:{
    display:"block",
},
pagination:{
marginLeft:"40%",
marginTop:"5%",
display:"block",
width:"100%"
},
buttonGrid:{
   float:"right",
   padding:"13px"
},

toggle:{
    marginLeft:"4%",
   
    },
buttonFirst:{
margin:"10px"
},
message:{
marginLeft:"25%"
},
'@global': {
    '.MuiCardHeader-avatar':{
        flex: "0 0 auto",
        marginRight: "16px",
        marginLeft: "46%",
    }
  },


}))

 function CustomerHome({customerApiStart,productData}) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  useEffect(()=>{
    customerApiStart();
  },[])

  const [page, setPage] = React.useState(1);
  const [activeSlide, setActiveSlide] = React.useState(0);
  const [selected, setSelected] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState();
  const [obj, setObj] = React.useState("");




  const handleChange = (event, value) => {
    setPage(value);

    if(value==1){
        setActiveSlide(0)
    }
    if(value==2)
    {
        setActiveSlide(4)
    }
    if(value==3)
    {
        setActiveSlide(8)
    }
    if(value==4)
    {
        setActiveSlide(12)
    }
    setSelected(false);
  };



const newArr = productData.productData && productData.productData.map((value)=>{
    return value.bids;

})

let newObj=[];
let minimumBid=[];
let maximumBid=[];


for(let i=0;i<newArr.length;i++){
  let price=0,maxBid=0,minBid=0;maxBid=0;
    newArr[i].map((value)=>{
        price+=value.amount;
    })
    minBid=Math.min.apply(Math, newArr[i].map(function(price) { return price.amount; }))
    maxBid=Math.max.apply(Math, newArr[i].map(function(price) { return price.amount; }))

    newObj.push(price);
    minimumBid.push(minBid);
    maximumBid.push(maxBid);
}

    let newProductData = productData.productData && productData.productData.map((value,index)=>({...value,totalAmount:newObj[index],highestBid:maximumBid[index],lowestBid:minimumBid[index]}))


useEffect(()=>{
setSelected(true)
},[currentIndex])

if(obj==="lowtoHigh"){
  newProductData.sort(function(a,b){return( a.totalAmount-b.totalAmount)});
}

if(obj==="Highttolow"){
  newProductData.sort(function(a,b){return( b.totalAmount-a.totalAmount)});
}

  return (
    <div className={classes.root}>
      <h1 className={classes.heading}>Cards</h1>
      <div className={classes.message}>Sorting is done on the basis of total amount of bids per customer have(i.e sum of all bids of a particular customer)</div>
      <div className={classes.buttonGrid}>
      <Button variant="contained" className={classes.buttonFirst} onClick={
        ()=>{
          setObj("lowtoHigh")
        }
      }>click for Low to High</Button>
      <Button variant="contained" onClick={
        ()=>{
          setObj("Highttolow")
        }
      }>click for High to Low</Button>
      </div>
      <Grid container className={classes.MarginFromTop} spacing={3}>
      
      {
          newProductData && newProductData.slice(activeSlide,activeSlide + 3).map((value,index)=>{
              return(
                  <>
                   <Card className={classes.cardStyle}>
      <CardContent>
          <CardHeader className={classes.cardHeader} avatar={<Avatar alt="Apple"  src="https://prod_membership_avatars.s3.amazonaws.com/avatar-file-d84b533b09f34ab6908345833dc21773.jpg" />}
           />
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {value.firstname} {value.lastname}
        </Typography>
        <Typography variant="h5" component="h2">
          {value.email}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {value.phone}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
            
          {
              index===currentIndex && selected ?
              `Min Bid :
              
              ${value.lowestBid}`
              :
         `Max Bid :
         ${value.highestBid}`
              }
                    <ToggleButton
            className={classes.toggle}
            selected={index===currentIndex && selected}
            value={index}
            onChange={(event) => {
                setSelected(!selected)
                setCurrentIndex(index)
            }}
            >
            <DoneSharpIcon/>
            </ToggleButton>
        </Typography>
        <Typography variant="body2" component="p">
          premium:{value.hasPremium ? "true" : "false"}
          <br />
        </Typography>
        <Typography variant="body2" component="p">
          Total amount for Bidding : {value.totalAmount}
          <br />
        </Typography>
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>
                  </>
              )
          })
      }
<Pagination className={classes.pagination} page={page} count={4} variant="outlined"  onChange={handleChange}  color="primary" />

</Grid>

</div>

    
  );
}

const mapStateToProps = state => ({
  productData: state,
  // length:state.length
});

const mapDispatchToProps = (dispatch) => ({
customerApiStart:(value) => dispatch(customerApiStart(value))  
});


export default connect(mapStateToProps,mapDispatchToProps)(CustomerHome)
