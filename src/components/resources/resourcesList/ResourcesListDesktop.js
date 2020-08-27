import GridItem from "../../material-kit-components/Grid/GridItem";
import GridContainer from "../../material-kit-components/Grid/GridContainer";
import React from "react";
import {AddResourceCardDesktop, ResourcesCardListView, ResourcesCardGridView, Heading, CustomButton, Search} from "../..";
import ResourcesListFunctionality from "./ResourcesListFunctionality"
import {CoolerButton} from "./ResourcesListFunctionality"
import {CircularProgress, Select, MenuItem, IconButton, AppBar, Toolbar} from "@material-ui/core";
import ViewListIcon from '@material-ui/icons/ViewList';
import GridOnIcon from '@material-ui/icons/GridOn';
import {withStyles} from "@material-ui/core/styles";
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

const useStyles = () => ({
  searchBar: {
    width:'30%',
    marginTop: '-600px',
    display: 'inline-block',
    marginLeft: '3%',
    verticalAlign: 'middle',
  },
  appBar: {
    top: '60px',
  },
  appBarTwo: {
    top: '160px'
  },
  toolbar: {
    minHeight: '157px'
  },
  topSearchBar: {
    width:'30%',
    marginTop: '-50px',
    marginLeft: '3%',
  },
  tagButtons: {
    marginTop: '50px',
    marginLeft: '-10%',
    width: '70%'
  },
  resourcesFound: {
    marginLeft:'2%',
    marginTop: '3%',
    display: 'inline-block',
    textAlign: "center",
    verticalAlign: 'middle',
    color: "#828282",
    fontSize: "18px"
  },
  dropdownMenu: {
    width:'12%',
    marginLeft:'57%',
    marginTop: '3%',
    display: 'inline-block',
    textAlign: "center",
    verticalAlign: 'middle'
  },
  viewIcon: {
    width:'2%',
    marginLeft:'2%',
    marginTop: '3%',
    display: 'inline-block',
    textAlign: "center",
    verticalAlign: 'middle'
  },
  searchError: {
    textAlign:'center',
    color: 'red',
    marginTop: '5px'
  },
  category: {
    textAlign:'center',
    marginTop: '30px'
  },
  description: {
    textAlign: 'center',
    marginTop: '15px',
    paddingLeft: '20px',
    paddingRight: '20px'
  },
  addResourceBox: {
    paddingRight:"10%",
    backgroundColor: "#3B5998",
    borderRadius: '5px',
    borderStyle: "solid",
    borderColor: "#3B5998",
    borderWidth: "thick",
    flexDirection: "row",
    display: "flex",
    paddingTop: "10px",
    paddingBottom: "30px",
  },
  addResourceText: {
    paddingLeft: "4%",
    marginLeft: "10px",
    color:"white",
    textAlign: "left"
  },
  addResourceButton: {
    marginLeft: "auto",
    marginRight: "-7%",
    marginTop: "30px",
    verticalAlign: "center"
  },
  resourcesList: {
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingTop: '50px'
  },
  gridCard: {
    marginBottom: "40px",
    marginTop: "10px"
  },
  listCard: {
    marginBottom: "10px",
    marginTop: "5px"
  }
});

class ResourcesListDesktop extends ResourcesListFunctionality {
  constructor(props) {
    super(props);
    this.state = {...this.state, activeTags: ""}
    this.category = "All Resources";
  }

  handleClickTag(categories){
    return this.setTagDisplay.bind(this, "recreation")
  };

  handleClickView(isGridView){
    this.setState({
      gridView: isGridView
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <React.Fragment>
        <AppBar position="fixed" color="white" className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <div className={classes.topSearchBar} style={{display: 'flex', flexDirection: 'column'}}>
            <Search data={this.state.myResourcesDisplay}
              ref={input => this.inputElement = input}
              onClick={(val) => { this.searchFunc(val) }}
              onCancel={() => { this.searchFunc('') }}
              placeholder={"Search resources"}
              style={{height:'70%'}}
            />
            </div>
            <div className={classes.tagButtons} style={{display: 'flex', flexDirection: 'row'}}>
              {this.state.tagsDisplay.sort().map((tag, idx) => {
                return (
                  <CoolerButton key={idx}
                                style={{marginTop: 5,
                                        marginBottom: 5,
                                        marginLeft: 10,
                                        fontSize: 'min(1.5vw, 9px)',
                                }}
                                onClick={this.setTagDisplay.bind(this, tag)}
                                otherClickOption={this.deleteTagDisplay.bind(this, tag)}
                                category={this.state.category}
                                val={tag}
                  />
                );
              })}
            </div>
            <div style={{textAlign: 'right'}} className={classes.dropdownMenu}>
            <Select
              labelId="label"
              id="select"
              value={this.state.selection}
              onChange={this.handleChange}
              style={{'&:before': {borderColor: '#0072CE'}, fill: 'white'}}
              variant={"outlined"}
            >
              <MenuItem value={1}>Sort by</MenuItem>
              <MenuItem value={2}>Alphabetical</MenuItem>
            </Select>
            </div>
            <div className={classes.viewIcon}>
                <IconButton onClick={this.handleClickView.bind(this, true)}>
                    <GridOnIcon style={{fill: "#0072CE", textShadow: "0 0 3px #000"}}/>
                </IconButton>
            </div>
            <div className={classes.viewIcon}>
                <IconButton onClick={this.handleClickView.bind(this, false)}>
                    <ViewListIcon style={{fill: "#0072CE"}}/>
                </IconButton>
            </div>
          </Toolbar>
          </AppBar>
        </React.Fragment>

        <div className={classes.searchBar}>
          <Search data={this.state.myResourcesDisplay}
            ref={input => this.inputElement = input}
            onClick={(val) => { this.searchFunc(val) }}
            onCancel={() => { this.searchFunc('') }}
            placeholder={"Search resources"}
            iconColor={"white"}
          />
          <div className={classes.searchError}>{this.state.searchError}</div>
        </div>
        <div style={{flexDirection: 'row', display: 'flex', marginTop: '-7%'}}>
          {Object.keys(this.state.resourcesDict).sort().map(category => {
            return (

              // added new custom buttons that toggle on/off based on click status
              <CustomButton size="medium"
                  active={(this.state.activeTags === category)}
                  simple

                  // if category is "All Resources", do not display
                  style={category !== "All Resources" ?{
                      width: '16%',
                      height: '120px',
                      boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.1)',
                      marginRight: '20px',
                      marginTop: '2%',
                      fontFamily: 'Poppins, Roboto, Helvetica, Arial, sans-serif',
                      fontStyle: 'normal',
                      fontWeight: '900',
                      fontSize: '14px',
                      wordWrap: 'breakWord'
                  }
                  :{
                    display: 'None'
                  }
                  }
                  onClick={() =>{
                    if (this.category===category)
                    {
                      this.category = "All Resources";
                      category = "All Resources";
                    }
                    else
                    {
                      this.category = category;
                    }
                    this.deleteDisplay.bind(this, category);
                    this.setDisplay.bind(this, category)();

                  }}

                  val={category}
                  color={
                    (this.category === category) ? "blue" : 'paleblue'
                  }
                  text={category}
              />
            );
          })}
        </div>

        <br/>
        <Heading color={'blue'}
                 className={classes.category}
        >{this.state.category}</Heading>

        <div className={classes.description}
        >{this.state.description}</div>
        <br/>
        <div style={{textAlign: 'center'}}>
          {this.state.tagsDisplay.sort().map((tag, idx) => {
            return (
              <CoolerButton key={idx}
                            style={{marginTop: 5,
                                    marginBottom: 5,
                                    marginLeft: 10,
                                    fontSize: 'min(1.5vw, 9px)',
                            }}
                            onClick={this.setTagDisplay.bind(this, tag)}
                            otherClickOption={this.deleteTagDisplay.bind(this, tag)}
                            category={this.state.category}
                            val={tag}
              />
            );
          })}
        </div>
        <div className={classes.resourcesFound}> {this.state.resourcesDisplay.length} Resources Found </div>
        <div className={classes.dropdownMenu}>
            <Select
              labelId="label"
              id="select"
              value={this.state.selection}
              onChange={this.handleChange}
              style={{'&:before': {borderColor: '#0072CE'}, fill: 'white'}}
              variant={"outlined"}
            >
              <MenuItem value={1}>Sort by</MenuItem>
              <MenuItem value={2}>Alphabetical</MenuItem>
            </Select>
        </div>
        <div className={classes.viewIcon}>
            <IconButton onClick={this.handleClickView.bind(this, true)}>
                <GridOnIcon style={{fill: "#0072CE", textShadow: "0 0 3px #000"}}/>
            </IconButton>
        </div>
        <div className={classes.viewIcon}>
            <IconButton onClick={this.handleClickView.bind(this, false)}>
                <ViewListIcon style={{fill: "#0072CE"}}/>
            </IconButton>
        </div>
        {!this.state.gridView && <div>
          <br/><br/>
          <div className={classes.addResourceBox}>
              <div className={classes.addResourceText}>
                <h2 style={{fontSize:28}}>Want to add your own resource?</h2>
                <p style={{fontSize: 14}}>Thank you for your interest in sharing your resource through CVC! Please click the button to fill out a short form.
                </p>
              </div>
              <div className={classes.addResourceButton}>
                <CustomButton text={"ADD RESOURCE"}
                            href={"/resources/add-new-resource"}
                            color={"blueInvert2"}
                            size={"large"}
               />
              </div>
            </div>
        </div>}

        <GridContainer style={{width: '100%'}}>
          <GridItem>
            <GridContainer className={classes.resourcesList}>
              {this.state.activityIndicator && <CircularProgress style={{ marginLeft: '50%' }} /> }
              {!this.state.activityIndicator && this.state.gridView && <GridItem xs={12}
                        sm={6}
                        md={3}
                        className={classes.gridCard}
                >
                <AddResourceCardDesktop/>
              </GridItem>}
              {!this.state.activityIndicator && this.state.gridView && this.state.resourcesDisplay.map((data) => {
                return (
                  <GridItem xs={12}
                            sm={6}
                            md={3}
                            className={classes.gridCard}
                  >
                    <ResourcesCardGridView
                      website={data.links.website}
                      img={data.img}
                      title={data.title}
                      description={data.description}
                      iosLink={data.links.iosLink}
                      androidLink={data.links.androidLink}
                      tags={data.category.tags}
                      share
                    />

                  </GridItem>
                );

              })}
              {!this.state.activityIndicator && !this.state.gridView && this.state.resourcesDisplay.map(data => {
                return (
                  <GridItem xs={12}
                    sm={6}
                    md={6}
                    className={classes.listCard}
                  >
                    <ResourcesCardListView
                      ele = {data}
                      key={data.id}
                    />
                  </GridItem>
                );

              })}
            </GridContainer>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(useStyles)(ResourcesListDesktop);
