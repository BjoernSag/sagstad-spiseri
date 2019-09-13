import React, {Component} from "react"
import {graphql, Link} from "gatsby"
import Layout from "../components/layout"
import LayoutMobile from '../components/layoutMobile'
import Image from "gatsby-image"
import "../style/stylesheet.scss"
import "react-image-gallery/styles/css/image-gallery.css"
import ImageGallery from 'react-image-gallery'
import SkyLight from 'react-skylight'
import parse from 'html-react-parser'
import ReactToPrint from 'react-to-print'
import logo from '../images/minibus-passengers.png'
import PhoneBreakpoint from '../responsive_utilities/phone_breakpoint'
import DesktopBreakpoint from '../responsive_utilities/desktop_breakpoint';


export const query = graphql`
query ($slug: String) {
sanityProject(slug: {current: {eq: $slug}}) {
  title,
  howto {
      _key,
      _type,
      step,
      image {
        asset {
          fluid(maxHeight: 400){
            ...GatsbySanityImageFluid,
          }
        }
      },
    }
  mattags,
  subtitle,
  tips,
  shortdescription,
  tiltak,
  nutrition,
  ingrediens {
    amount,
    _key,
    name,
    unit,
    cathegory,
    optional,
  },
  extraIngrediens {
      name,
      unit,
      amount,
      cathegory,
      _key,
      optional,
    },
  portions,
  time,
  author {
    name
  },
  image {
    asset {
      fluid(maxHeight: 600) {
        src,
        ...GatsbySanityImageFluid,
      },
      fixed {
          src
        },
        path,
    }
  },
  images {
      asset {
        fluid (maxHeight: 600) {
          src,
          sizes
        }
        fixed {
          src
        }
      }
    },
}
}
`;

/*Legge til ekstra felt. Skrive "Må være fylt ut for at ekstra ingredienser skal vise + gjøre om ingredienser objekt eller legge til et nytt objekt av ingredienser for å kunne velge navn Må også legge til en for løkke i koden da"*/

const newList = [];
const newSecondList = [];
const newRemoved = [];
const secondRemoved = [];


class ProjectTemplate extends Component {
  constructor() {
    super();
    this.ingrTest = this.ingrTest.bind(this);
    this.ingrediensCheck = this.ingrediensCheck.bind(this);
    this.state = {
      portions :  0,
      newPortions: 0,
      list: null,
      listRemoved: null,
      secondList : null,
      secondListRemoved : null,
      activeCategory: 'ingen',
      limit: 0,
      merged: null,
    }
  }


  populateList = (newLength) => {
  if(this.state.list ===null){
    this.newList= [newLength];
    this.newRemoved = [newLength];
    for(let i = 0; i<newLength; i++){
      this.newList[i] = 'unClicked';
      this.newRemoved[i] = false;
    }
    this.setState({
      list : this.newList,
      listRemoved : this.newRemoved,
    })
  }
  else {
    return;
  }
}
  populateSecondList = (newLength) => {
  if(this.state.secondList ===null){
    this.newSecondList= [newLength];
    this.secondRemoved = [newLength];
    for(let i = 0; i<newLength; i++){
      this.newSecondList[i] = 'unClicked';
      this.secondRemoved[i] = false;
    }
    this.setState({
      secondList : this.newSecondList,
      secondListRemoved : this.secondRemoved,
    })
  }
  else {
    return;
  }
}


  ingrediensIndex= (ingrediens , key) => {
      let classL = '';
      for(let i=0; i<ingrediens.length; i++){
        let isOptional ='';
        if(ingrediens[i].name===key){
          if(this.state.list === null) {
            this.classL = 'unClicked';
          }else{
            this.classL = this.state.list[i];
          }
          if(ingrediens[i].optional !== null){
            isOptional = '(' + ingrediens[i].optional + ')';
          }
        return <div className={this.classL} onClick={() => this.ingrTest(i)} data-id="2">
        <div >
             <p>{(ingrediens[i].amount/this.state.portions)*this.state.newPortions} {ingrediens[i].unit} {ingrediens[i].name} {isOptional}  </p>
             </div>
          </div>
        }
      }
    }

  ingrTest = (index) => {
      if(this.state.list===null)
      return;
      if(this.newList[index] === 'unClicked'){
        this.newList[index] = 'Clicked';
        this.newRemoved[index] = true;
        this.setState({
          list : this.newList,
          listRemoved : this.newRemoved,
        });

      }else if(this.newList[index]==='Clicked'){
        this.newList[index] = 'unClicked';
        this.newRemoved[index] = false;
        this.setState({
          list : this.newList,
          listRemoved : this.newRemoved,
        });
      }
    }

  extraIngrediensIndex= (ingrediens , key) => {

      let classD = '';
      for(let i=0; i<ingrediens.length; i++){
        let isOptional ='';
        if(ingrediens[i].name===key){
          if(this.state.secondList === null) {
            this.classD = 'unClicked';
          }else{
            this.classD = this.state.secondList[i];
          }
          if(ingrediens[i].optional!==null){
            isOptional = '(' + ingrediens[i].optional + ')';
          }
        return <div className={this.classD} onClick={() => this.extraIngrTest(i)}  data-id="2">
        <div >
             <p>{(ingrediens[i].amount/this.state.portions)*this.state.newPortions} {ingrediens[i].unit} {ingrediens[i].name}  {isOptional}</p>
             </div>
          </div>
        }
      }
    }

  extraIngrTest = (index) => {
      if(this.state.secondList===null)
      return;
      if(this.newSecondList[index] === 'unClicked'){
        this.newSecondList[index] = 'Clicked';
        this.secondRemoved[index] = true;
        this.setState({
          secondList : this.newSecondList,
          secondListRemoved : this.secondRemoved,
        });
      }else if(this.newSecondList[index]==='Clicked'){
        this.newSecondList[index] = 'unClicked';
        this.secondRemoved[index] = false;
        this.setState({
          secondList : this.newSecondList,
          secondListRemoved : this.secondRemoved,
        });
      }
    }

  updateCathegoryState(length, newState) {
      if(newState === this.state.activeCategory)
      return;
      else if(this.state.limit >length){
        return;
      }
      else {
        this.setState({
          activeCategory : newState,
          limit: this.state.limit+1,
        })
      }
    }

  ingrediensCheck= (ingrediens , key) => {
      if(this.state.listRemoved===null)
      return;
      let arra = '';
      for(let i=0; i<ingrediens.length; i++){
        if(ingrediens[i].name===key && this.state.listRemoved[i] === false){
          if(ingrediens[i].cathegory === this.state.activeCategory) {
            arra += ' ' + (ingrediens[i].amount/this.state.portions)*this.state.newPortions + " " + ingrediens[i].unit + " " + ingrediens[i].name;
          }
          else if(ingrediens[i].cathegory !== this.state.activeCategory){
            arra += ingrediens[i].cathegory;
            this.updateCathegoryState (ingrediens.length, ingrediens[i].cathegory);
            arra += ' ' + (ingrediens[i].amount/this.state.portions)*this.state.newPortions + " " + ingrediens[i].unit + " " + ingrediens[i].name;
          }

          }
      }
      return arra;
    }

  ingrediensCheckSecond= (ingrediens , key) => {
      if(this.state.secondListRemoved===null)
      return;
      let arra = [];
      for(let i=0; i<ingrediens.length; i++){
        if(ingrediens[i].name===key && this.state.secondListRemoved[i] === false)
        arra[i] = (ingrediens[i].amount/this.state.portions)*this.state.newPortions + " " + ingrediens[i].unit + " " + ingrediens[i].name;
      }
      return arra;
    }

  howToIndex= (howTo, key) => {
      for(let i=0; i<howTo.length; i++){
        if(howTo[i]._key === key){
          return <div>
          <div className="unClicked" onClick={this.handleCheck.bind(this)} data-id="1">
            <div className="howToGrid">
            <div className="circle">
              {i+1}
              </div>
              <div>
               <p>{howTo[i].step}</p>
               {this.hasHowToImage(howTo[i])}
               </div>
              </div>
            </div>
          </div>
        }
      }
    }

  hasHowToImage = (howTo) => {
      if(howTo.image === null || howTo.image.asset === null){
        return;
      }else {
        return <Image fluid={howTo.image.asset.fluid}  alt={howTo._key} />
      }
    }

  coloredLine = (color) => (
      <hr
        style={{
          color: color,
          backgroundColor: color,
          height: 1,
          maxWidth: '100%',
          opacity: 1,
        }}
      />
    );

  handleCheck(e) {
      if(e.currentTarget.className==='unClicked'){
        e.currentTarget.classList.add('Clicked');
        e.currentTarget.classList.remove('unClicked');
      }else if(e.currentTarget.className==='Clicked'){
        e.currentTarget.classList.add('unClicked');
        e.currentTarget.classList.remove('Clicked');
      }
    };

  setStatePortion = (portion) => {
      if(this.state.portions===portion){
      return;
    }
      else{
        this.setState ({
        portions: portion,
        newPortions: portion
      })}
    }

  handleInputChange  = (event) => {
    const target = event.target;
    if(target.value>40) return;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      newPortions: value
    });
  }

  sortArrayOfObjects = (arr) => {
    arr.sort(function(a,b) {
      return (a.cathegory).localeCompare(b.cathegory);
    });
  }

/*
  Helpermethod for shopping list layout, to find the indices. Basically how many item of each genre
*/
  changing = (arr) => {
    const unique = [...new Set(arr.map(item => item.cathegory))];
    const numberdArray = [unique.length+1];
    let numberSplice = 1;
    let index = 0;
    let indexFloor = 0;
    numberdArray[0] = 0;
    while(numberSplice<unique.length && index+1<arr.length){
      if(arr[index].cathegory !== arr[index+1].cathegory){
        numberdArray[numberSplice] =  index+1;
        numberSplice++;
        index++;
        indexFloor = index;
      }
      else {
        index++;
      }
      this.index = index;
      this.indexFloor = indexFloor;
    }
    numberdArray[unique.length] = arr.length;
    return numberdArray;
  }

/*
  Method to construct the shoppinglist Layout
*/
  shoppingListLayout = (arr, secondArr) => {
    if(this.state.listRemoved === null) {
      return;
    }
    var para = document.createElement("DIV");
    para.className="shoppingListDiv"

    //Combining the two arrays
    const newArray = arr.concat(secondArr);
    this.sortArrayOfObjects(newArray);
    let indexes = this.changing(newArray);
    const unique = [...new Set(newArray.map(item => item.cathegory))];

    //finding the unique genres of array 1 and 2 and their indexes
    const arrUnique = [...new Set(arr.map(item => item.cathegory))];
    this.sortArrayOfObjects(arr);
    let arrBreakIndexes = this.changing(arr);
    const secondArrUnique = [...new Set(secondArr.map(item => item.cathegory))];
    this.sortArrayOfObjects(secondArr);
    let secondArrBreakIndexes = this.changing(secondArr);




    //indexes of array 1 and 2
    let arrIndex = 0;
    let secondArrIndex = 0;

    //for loop running through the unique genres of the combined array and printing those out
    for(let j = 0; j<indexes.length-1; j++){
      var innerDiv = document.createElement("DIV");
      if(unique[j] ===null) return;
      var node =document.createTextNode(unique[j].charAt(0).toUpperCase() + '' + unique[j].slice(1));
      var head = document.createElement("H4");
      head.className = "shoppingListHeader";
      head.appendChild(node);
      innerDiv.appendChild(head);

    //test to check if array 1 has any items of the cathegory and a for loop to print if it does
    if(arrUnique[arrIndex] === unique[j]){
      for(let i = arrBreakIndexes[arrIndex]; i<arrBreakIndexes[arrIndex+1]; i++){
        if(this.state.listRemoved[i] === false){
          var bodyNode =document.createTextNode(arr[i].name + '\n');
          var bodyNode2 =document.createTextNode((arr[i].amount/this.state.portions)*this.state.newPortions + '' + arr[i].unit);
          var body = document.createElement("p");
          var body2 = document.createElement("p");
          body.className = "shoppingListBody";
          body2.className = "shoppingListBody2";
          body.appendChild(bodyNode);
          body2.appendChild(bodyNode2);
          innerDiv.appendChild(body);
          innerDiv.appendChild(body2);
        }
    } arrIndex++;
  }
    //test to check if array 2 has any items of the cathegory and a for loop to print of it does
    if(secondArrUnique[secondArrIndex] === unique[j]){
    for(let i = secondArrBreakIndexes[secondArrIndex]; i<secondArrBreakIndexes[secondArrIndex+1]; i++){
      if(this.state.secondListRemoved[i] === false){
        var bodyNode =document.createTextNode(secondArr[i].name + '\n');
        var bodyNode2 =document.createTextNode((secondArr[i].amount/this.state.portions)*this.state.newPortions  + '' + secondArr[i].unit);
        var body = document.createElement("p");
        var body2 = document.createElement("p");
        body.className = "shoppingListBody";
        body2.className = "shoppingListBody2";
        body.appendChild(bodyNode);
        body2.appendChild(bodyNode2);
        innerDiv.appendChild(body);
        innerDiv.appendChild(body2);
      }
  }secondArrIndex++;
}
    para.appendChild(innerDiv)
  }
    //document.getElementById("myList").appendChild(para);
      return para.outerHTML;
}

  hasImages = (data) => {
    if(data.sanityProject.images.length >0){
      const images = [data.sanityProject.images.length];
      images[0] = {original : data.sanityProject.image.asset.fluid.src,}
      for(let i = 0; i<data.sanityProject.images.length; i++){
        images[1+i] = {
          original : data.sanityProject.images[i].asset.fluid.src,
        }
      }
      return <ImageGallery
              items={images}
              lazyLoad={true}
              showPlayButton={false}
              showFullscreenButton={false}
              showNav={false}
              showBullets={true}
              showThumbnails={false}
              />
    }
    else {
      return <Image fluid={data.sanityProject.image.asset.fluid}  alt={data.sanityProject.title} />
    }
  }

/*Desktop specific layouts*/
  navContent = () => {
    return  <div class="navGrid">
        <div>
          <Link to="/">
            <img
              src={logo}
              style={{maxWidth:'48px', maxHeight:'48px'}}/>
          </Link>
        </div>
      </div>
  }
  topContent = (data) => {
    return   <div className="topGrid">
        <div>
          <h1 style={{paddingBottom:'0'}}>{data.sanityProject.title}</h1>
          <h5 style={{color:'#A63446'}}>{data.sanityProject.subtitle}</h5>
          {this.coloredLine('#A63446')}
          <h5>{data.sanityProject.shortdescription}</h5>
          {this.coloredLine('#A63446')}
          <div className="recipegrid">
            <div className="twoColoursGridSpecial">
              <p className="twoColoursGridTitle">Tid: </p>
              <p>{data.sanityProject.time}</p>
            </div>
            <div className="twoColoursGrid">
              <p className="twoColoursGridTitle">Porsjoner: </p>
              <p> <input
              style={{maxWidth: '40px'}}
                placeholder={this.state.portions}
                name="portions"
                type="number"
                checked={this.state.portions}
                onChange={this.handleInputChange}
                >
              </input></p>
              </div>
              <div className="twoColoursGrid">
                <p className="twoColoursGridTitle">Tiltak? </p>
                <p>{data.sanityProject.tiltak} tiltak</p>
              </div>
          </div>
          <p><b>Ærnæring Informasjon (per porsjon):</b> {data.sanityProject.nutrition}</p>
        </div>
        <div>
          {this.hasImages(data)}
        </div>
      </div>
  }
  bottomContent = (data, myBigGreenDialog) => {
    return   <div className="bottomGrid">
        <div>
        <h3>Ingredienser</h3>
          {data.sanityProject.ingrediens.map(({name: name}) => (
            <div>
                {this.ingrediensIndex(data.sanityProject.ingrediens, name)}
            </div>
          ))}
          <h3>Extra Ingredienser</h3>
          {data.sanityProject.extraIngrediens.map(({name: name}) => (
            <div>
                {this.extraIngrediensIndex(data.sanityProject.extraIngrediens, name)}
            </div>
          ))}
          <button
            style={{backgroundColor:'#A63446'}}
            onClick={() => this.simpleDialog.show()}>Se handleliste</button>
          <SkyLight
            hideOnOverlayClicked
            ref={ref => this.simpleDialog = ref}
            title={<h2>Min handleliste:</h2>}
            dialogStyles={myBigGreenDialog}
          >
            <div id="myList" className="back" ref={el => (this.componentRef = el)}>
                {parse(String(this.shoppingListLayout(data.sanityProject.ingrediens, data.sanityProject.extraIngrediens)))}
            </div>
            <ReactToPrint
                trigger={() => <a href="#">Print handlelisten!</a>}
                content={() => this.componentRef}
                pageStyle="margin:50px"
              />
          </SkyLight>
        </div>
        <div>
        <h3>Fremgansmåte</h3>
        {data.sanityProject.howto.map(({_key:key}) => (
          <div>
                {this.howToIndex(data.sanityProject.howto, key)}
          </div>
        ))}
        </div>
      </div>
  }

/*Mobile specific layouts*/
  topContentMobile = (data) => {
    return   <div>
        <div>
          <h1 style={{paddingBottom:'0'}}>{data.sanityProject.title}</h1>
          <h5 style={{color:'#A63446'}}>{data.sanityProject.subtitle}</h5>
          {this.coloredLine('#A63446')}
          <h5>{data.sanityProject.shortdescription}</h5>
          {this.coloredLine('#A63446')}
          <div>
            {this.hasImages(data)}
          </div>
          <div className="recipegrid">
            <div className="twoColoursGridSpecial">
              <p className="twoColoursGridTitle">Tid: </p>
              <p>{data.sanityProject.time}</p>
            </div>
            <div className="twoColoursGrid">
              <p className="twoColoursGridTitle">Porsjoner: </p>
              <p> <input
              style={{maxWidth: '40px'}}
                placeholder={this.state.portions}
                name="portions"
                type="number"
                checked={this.state.portions}
                onChange={this.handleInputChange}
                >
              </input></p>
              </div>
              <div className="twoColoursGrid">
                <p className="twoColoursGridTitle">Tiltak? </p>
                <p>{data.sanityProject.tiltak} tiltak</p>
              </div>
          </div>
          <p><b>Ærnæring Informasjon (per porsjon):</b> {data.sanityProject.nutrition}</p>
        </div>
      </div>
  }
  bottomContentMobile = (data, dialogMobile) => {
    return   <div>
      <center>
          <div>
          <h3>Ingredienser</h3>
            {data.sanityProject.ingrediens.map(({name: name}) => (
              <div>
                  {this.ingrediensIndex(data.sanityProject.ingrediens, name)}
              </div>
            ))}
            <h3>Extra Ingredienser</h3>
            {data.sanityProject.extraIngrediens.map(({name: name}) => (
              <div>
                  {this.extraIngrediensIndex(data.sanityProject.extraIngrediens, name)}
              </div>
            ))}
            <button
              style={{backgroundColor:'#A63446'}}
              onClick={() => this.simpleDialog.show()}>Se handleliste</button>
            <SkyLight
              hideOnOverlayClicked
              ref={ref => this.simpleDialog = ref}
              title={<h2>Min handleliste:</h2>}
              dialogStyles={dialogMobile}
            >
              <div id="myList" classList="back"  ref={el => (this.componentRef = el)}>
                  {parse(String(this.shoppingListLayout(data.sanityProject.ingrediens, data.sanityProject.extraIngrediens)))}
              </div>
              <ReactToPrint
                  trigger={() => <a href="#">Print handlelisten!</a>}
                  content={() => this.componentRef}
                  pageStyle="margin:50px"
                />
            </SkyLight>
          </div>
        </center>
        <div>
        <br />
        {this.coloredLine('#A63446')}
        <center><h3>Fremgansmåte</h3></center>
        {data.sanityProject.howto.map(({_key:key}) => (
          <div>
                {this.howToIndex(data.sanityProject.howto, key)}
          </div>
        ))}
        </div>
      </div>
  }


render() {
  const {data } = this.props;
  const myBigGreenDialog = {
    width: '70%',
    height: '600px',
    maxHeigh: '70%',
    marginTop: '-300px',
    marginLeft: '-35%',
    overflow: 'scroll',
  };
  const dialogMobile = {
    width: '100%',
    height: '75%',
    maxHeigh: '50%',
    marginTop: '-60%',
    marginLeft: '-50%',
    overflow: 'scroll',
  };

  this.setStatePortion(data.sanityProject.portions);
  this.populateList(data.sanityProject.ingrediens.length);
  this.populateSecondList(data.sanityProject.extraIngrediens.length);

  {this.sortArrayOfObjects(data.sanityProject.extraIngrediens)}
  {this.sortArrayOfObjects(data.sanityProject.ingrediens)}
  return(
    <div>
      <DesktopBreakpoint>
  <Layout >
    {this.navContent()}
    {this.topContent(data)}
  <div className="spaceTop"></div>
  {this.coloredLine('#A63446')}
  <div className="spaceBottom"></div>
  {this.bottomContent(data, myBigGreenDialog)}
  <div className="tipsDiv">
    <h3>Tips og triks</h3>
      <p>{data.sanityProject.tips}</p>
  </div>
  {this.coloredLine('#A63446')}
    <Link to="/">Tilbake til listen med oppskrifter</Link>
  </Layout>
  </DesktopBreakpoint>>
  <PhoneBreakpoint>
  <LayoutMobile >
    {this.navContent()}
    {this.topContentMobile(data)}
  <div className="spaceTop"></div>
  {this.coloredLine('#A63446')}
  <div className="spaceBottom"></div>
  {this.bottomContentMobile(data, dialogMobile)}
  <div className="tipsDiv">
    <h3>Tips og triks</h3>
      <p>{data.sanityProject.tips}</p>
  </div>
  {this.coloredLine('#A63446')}
    <Link to="/">Tilbake til listen med oppskrifter</Link>
  </LayoutMobile>
  </PhoneBreakpoint>
  </div>
)
}}
  export default ProjectTemplate;
