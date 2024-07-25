import React, { Component } from "react"
import { Link, graphql } from "gatsby"
import Image from "gatsby-image"
import "../style/stylesheet.scss"
import logo from '../images/minibus-passengers.png'
import PhoneBreakpoint from '../responsive_utilities/phone_breakpoint'
import DesktopBreakpoint from '../responsive_utilities/desktop_breakpoint';
import SkyLight from 'react-skylight'
import parse from 'html-react-parser'

import Layout from "../components/layoutPortefolio"
import LayoutMobile from '../components/layoutMobile'

import SEO from "../components/seo"

export const query = graphql`
{
allSanityProject {
  totalCount
  pageInfo {
    hasNextPage
    currentPage
    }
  edges{
    node {
      title,
      subtitle,
      backgroundcolor,
      boxbackgroundcolor,
      id,
      mattags,
      maincath,
      author {
        name,
        slug{
          current
        }
      },
      slug {
        current
      },
    },
  },
  nodes {
    author {
      name,
      slug{
        current
      }
    }
  }
}
}
`;

export const sortArrayOfObjects = (arr) => {
  arr.sort(function(a,b) {
    return (a.node.title).localeCompare(b.node.title);
  });
  return arr;
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      activePage: 0,
      mouseOver: false,
      biff: false,
      kylling: false,
      fisk: false,
      vegetar: false,
      dessert: false,
      condiments : false,
      annet: false,
      selectedOption: 'alle',
      authorOption: 'alle',
    }
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }

    handleOnMouseOver = (e) =>{
this.setState(
    {
      activePage: 0,
      mouseOver: true
    });
  }



    pageOnChange = (edges , id) => {
    let number = 0;
    for(let i=0; i<edges.length; i++){
      if(edges[i].node.id===id){
        number = i;
      }
    }
    if(this.state.activePage===number){
      return
    } else this.setState(
      {
        activePage: number
      });
    }

    filterRadioInputForm = () => {
      return <form>
        <div className="radio">
          <label>
            <input type="radio" value="Kjøtt"
                          checked={this.state.selectedOption === 'Kjøtt'}
                          onChange={this.handleOptionChange} />
            Kjøtt
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" value="Kylling"
                          checked={this.state.selectedOption === 'Kylling'}
                          onChange={this.handleOptionChange} />
             Kylling
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" value="Fisk"
                          checked={this.state.selectedOption === 'Fisk'}
                          onChange={this.handleOptionChange} />
            Fisk
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" value="Vegetar"
                          checked={this.state.selectedOption === 'Vegetar'}
                          onChange={this.handleOptionChange} />
            Vegetar
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" value="Dessert"
                          checked={this.state.selectedOption === 'Dessert'}
                          onChange={this.handleOptionChange} />
            Dessert
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" value="Krydder/Saus"
                          checked={this.state.selectedOption === 'Krydder/Saus'}
                          onChange={this.handleOptionChange} />
            Krydder/Saus
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" value="Annet"
                          checked={this.state.selectedOption === 'Annet'}
                          onChange={this.handleOptionChange} />
            Annet
          </label>
        </div>
      </form>
    }
    filterDropDownForm =(data) => {
      let nodesArray = [data.allSanityProject.nodes.length];
      let options= "<option value=alle></option>";
      const unique = [...new Set(data.allSanityProject.nodes.map(item => item?.author?.slug?.current))];
      const uniqueNames = [...new Set(data?.allSanityProject?.nodes?.map(item => item?.author?.name))];
        for(let i = 0; i<unique.length; i++){
          options+= "<option value="+unique[i]+">"+uniqueNames[i]+"</option>";
        }
        return <form>
        <label>
          Hvilken masterchef stoler du på idag?
          <select
            value={this.state.authorOption}
            onChange={this.handleDropdownChange}>
            {parse(options)}
          </select>
        </label>
      </form>
    }

    handleDropdownChange(e){
      this.setState({
        authorOption: e.target.value
      });
    }
    handleOptionChange(e){
      this.setState({
        selectedOption: e.target.value
      });
    }

    isFiltered =(data, project) => {
      if(this.state.selectedOption === 'alle') {
        if(this.state.authorOption === 'alle'){
         return <div>
            <li
            key={project.slug.current}
            style={{flex: '1 45%', maxWidth: '100%', marginBottom:'3rem'}}
            >
              <h2>
                <Link
                  onMouseOver={() => this.pageOnChange(data.allSanityProject.edges, project.id)}
                  to={project.slug.current}
                  class="portefolioLink">
                  <div class="hoveredLink">
                    <p class="title">
                        {project.title}
                    </p>
                    <p class="subtitle">
                      {project.subtitle}
                    </p>
                    </div>
                </Link>

              </h2>
            </li>
          </div>
        }else if(project.author.slug.current === this.state.authorOption){
          return <div>
             <li
             key={project.slug.current}
             style={{flex: '1 45%', maxWidth: '100%', marginBottom:'3rem'}}
             >
               <h2>
                 <Link
                   onMouseOver={() => this.pageOnChange(data.allSanityProject.edges, project.id)}
                   to={project.slug.current}
                   class="portefolioLink">
                   <div class="hoveredLink">
                     <p class="title">
                         {project.title}
                     </p>
                     <p class="subtitle">
                       {project.subtitle}
                     </p>
                     </div>
                 </Link>

               </h2>
             </li>
           </div>
        }
        else {
          return;
        }
      }
      else if(project.maincath === this.state.selectedOption){
        if(this.state.authorOption === 'alle'){
         return <div>
            <li
            key={project.slug.current}
            style={{flex: '1 45%', maxWidth: '100%', marginBottom:'3rem'}}
            >
              <h2>
                <Link
                  onMouseOver={() => this.pageOnChange(data.allSanityProject.edges, project.id)}
                  to={project.slug.current}
                  class="portefolioLink">
                  <div class="hoveredLink">
                    <p class="title">
                        {project.title}
                    </p>
                    <p class="subtitle">
                      {project.subtitle}
                    </p>
                    </div>
                </Link>

              </h2>
            </li>
          </div>
        }else if(project.author.slug.current === this.state.authorOption){
          return <div>
             <li
             key={project.slug.current}
             style={{flex: '1 45%', maxWidth: '100%', marginBottom:'3rem'}}
             >
               <h2>
                 <Link
                   onMouseOver={() => this.pageOnChange(data.allSanityProject.edges, project.id)}
                   to={project.slug.current}
                   class="portefolioLink">
                   <div class="hoveredLink">
                     <p class="title">
                         {project.title}
                     </p>
                     <p class="subtitle">
                       {project.subtitle}
                     </p>
                     </div>
                 </Link>

               </h2>
             </li>
           </div>
        }
       else {
         return;
       }
     }
    }
    isFilteredMobile = (data, project) => {
      if(this.state.selectedOption === 'alle') {
        if(this.state.authorOption === 'alle'){
         return <div className="frontPageContainer">
           <Image
           style={{width: '100%', height: '350px', maxWidth:'100%', maxHeight:'50%' }}    fluid={project?.image?.asset?.fluid}  alt={project.title} />
           <div className="frontPageCentered">
             <h2 >
               <Link
                 to={project.slug.current}
                 style={{color:'white', textDecoration:'none'}}>
                 <div>
                   <p className="title">
                       {project.title}
                   </p>
                   <p className="subtitle">
                     {project.subtitle}
                   </p>
                   </div>
               </Link>
             </h2>
             </div>
         </div>
        }else if(project.author.slug.current === this.state.authorOption){
          return <div className="frontPageContainer">
            <Image
            style={{width: '100%', height: '350px', maxWidth:'100%', maxHeight:'50%' }}    fluid={project?.image?.asset?.fluid}  alt={project.title} />
            <div className="frontPageCentered">
              <h2 >
                <Link
                  to={project.slug.current}
                  style={{color:'black', textDecoration:'none'}}>
                  <div>
                    <p className="title">
                        {project.title}
                    </p>
                    <p className="subtitle">
                      {project.subtitle}
                    </p>
                    </div>
                </Link>
              </h2>
              </div>
          </div>
        }
        else {
          return;
        }
      }
      else if(project.maincath === this.state.selectedOption){
        if(this.state.authorOption === 'alle'){
         return<div className="frontPageContainer">
           <Image
           style={{width: '100%', height: '350px', maxWidth:'100%', maxHeight:'50%' }}    fluid={project?.image?.asset?.fluid}  alt={project.title} />
           <div className="frontPageCentered">
             <h2 >
               <Link
                 to={project.slug.current}
                 style={{color:'black', textDecoration:'none'}}>
                 <div>
                   <p className="title">
                       {project.title}
                   </p>
                   <p className="subtitle">
                     {project.subtitle}
                   </p>
                   </div>
               </Link>
             </h2>
             </div>
         </div>
        }else if(project.author.slug.current === this.state.authorOption){
          return <div className="frontPageContainer">
            <Image
            style={{width: '100%', height: '350px', maxWidth:'100%', maxHeight:'50%' }}    fluid={project?.image?.asset?.fluid}  alt={project.title} />
            <div className="frontPageCentered">
              <h2 >
                <Link
                  to={project.slug.current}
                  style={{color:'black', textDecoration:'none'}}>
                  <div>
                    <p className="title">
                        {project.title}
                    </p>
                    <p className="subtitle">
                      {project.subtitle}
                    </p>
                    </div>
                </Link>
              </h2>
              </div>
          </div>
        }
       else {
         return;
       }
     }
    }
    resetFilters = () => {
      if(this.state.selectedOption === 'alle' && this.state.authorOption === 'alle') {
        return;
      }else {
        this.setState({
          selectedOption : 'alle',
          authorOption : 'alle',
        })
      }
    }

    desktopContent =(data) => {
      return         <div class="grid">
                <div >
                  <ul style={{listStyle: 'none',  alignItems: 'space-between', padding:'0px 1rem 1.5rem', marginLeft:'20%', marginTop:'20%'}}>
                    <h1 class="portefolioStyle" >Oppskrifter</h1>
                    <button
                      style={{backgroundColor:'#A63446'}}
                      onClick={() => this.simpleDialog.show()}>Legg til søkefilter</button>
                      <button
                      className="spaceUnderButton"
                        style={{backgroundColor:'#A63446'}}
                        onClick={() => this.resetFilters()}>Reset filter</button>
                    <SkyLight
                      hideOnOverlayClicked
                      ref={ref => this.simpleDialog = ref}
                      title={<div><h2>Søkefilter</h2><h5>Hovedkategori:</h5></div>}
                    >
                      <div>
                        {this.filterRadioInputForm()}
                        {this.filterDropDownForm(data)}
                      </div>
                      <button
                        className="spaceUnderButtonMobile"
                        style={{backgroundColor:'#A63446'}}
                        onClick={() => this.simpleDialog.hide()}>Aktiver</button>
                      <button
                      className="spaceUnderButton"
                        style={{backgroundColor:'#A63446'}}
                        onClick={() => this.resetFilters()}>Reset filter</button>

                    </SkyLight>

                    {data.allSanityProject.edges.map(({node: project}) => (
                      this.isFiltered(data, project)
                    ))}

                  </ul>
                </div>
                <div /*Empty div to create 3 grids*/>
                </div>
                <div class="imageBackground" style={{background:data.allSanityProject.edges[this.state.activePage].node.backgroundcolor}}>
                <div>
                <Link to={data.allSanityProject.edges[this.state.activePage].node.slug.current}>
                  <div class="fixedImage" style={{backgroundColor:data.allSanityProject.edges[this.state.activePage].node.boxbackgroundcolor}}>

                  <Image
                  style={{height:'900px', width:'900px', maxWidth:'100%', maxHeight:'100%' }}    fluid={data.allSanityProject.edges[this.state.activePage].node.image?.asset?.fluid}  alt={data.allSanityProject.edges[this.state.activePage].node.title} />
                  </div>
                  </Link>
                  </div>
                </div>
              </div>
    }
    mobileContent = (data) => {
      return         <div>
                <h1 >Oppskrifter</h1>
                <button
                  style={{backgroundColor:'#A63446'}}
                  onClick={() => this.simpleDialog.show()}>Legg til søkefilter</button>
                  <button
                  className="spaceUnderButton"
                    style={{backgroundColor:'#A63446'}}
                    onClick={() => this.resetFilters()}>Reset filter</button>
                <SkyLight
                  hideOnOverlayClicked
                  dialogStyles={{width:'80%', marginLeft:'-40%'}}
                  ref={ref => this.simpleDialog = ref}
                  title={<div><h2>Søkefilter</h2><h5>Hovedkategori:</h5></div>}
                >
                  <div>

                    {this.filterRadioInputForm()}
                    {this.filterDropDownForm(data)}
                  </div>
                  <button
                    className="spaceUnderButtonMobile"
                    style={{backgroundColor:'#A63446'}}
                    onClick={() => this.simpleDialog.hide()}>Aktiver</button>
                  <button
                    style={{backgroundColor:'#A63446'}}
                    onClick={() => this.resetFilters()}>Reset filter</button>
                </SkyLight>
                <div >
                    {data.allSanityProject.edges.map(({node: project}) => (
                      this.isFilteredMobile(data, project)
                    ))}
                </div>
              </div>
    }


    render() {
      const {data } = this.props;
      {sortArrayOfObjects(data.allSanityProject.edges);}
      {this.filterDropDownForm(data)}


      return(
        <div>
      <DesktopBreakpoint>

        <Layout>
        <Link to="/"><img
          src={logo}
          style={{maxWidth:'70px', maxHeight:'70px' , position:'fixed', listStyle:'none',   marginLeft:'3%', marginTop:'3%'}}/></Link>
          <SEO title="Home" />
          {this.desktopContent(data)}
        </Layout>
      </DesktopBreakpoint>

      <PhoneBreakpoint>
        <LayoutMobile>
          <Link to="/"><img
            src={logo}
            style={{maxWidth:'70px', maxHeight:'70px' , listStyle:'none',   marginLeft:'3%', marginTop:'0%'}}/>
            </Link>
            <SEO title="Home" />
            {this.mobileContent(data)}
        </LayoutMobile>
      </PhoneBreakpoint>


      </div>
    );
    }
  }

  export default App;
