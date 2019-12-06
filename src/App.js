import React from 'react';
import './App.css';
import data from './continents.json'

class App extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        continents : [],
        countries: [],
        allCountries: [],
        flags: [],
        selectedContinent: ''
      }
  }

  continentFocus = ()=>{
    this.setState({continents : data})
  }

  onSearch = (e) =>{
    if(e.target.value.length > 0){
      let continents = this.state.continents.filter((item)=>
         (item.continent.toLowerCase().startsWith(e.target.value.toLowerCase()))
      );
      this.setState({continents})
    }
    else{
      this.setState({continents : data})
    }
  }

  onSelectContinent = (item) =>{
    this.setState({selectedContinent :item.continent,countries: item.countries,allCountries:item.countries})
  }

  onChangeCountry = (checked, country) =>{
    if(checked){
      let flags = [...this.state.flags,country.flag];
      this.setState({flags})
    }
    else{
      let flags = this.state.flags.filter((item)=>
         (item !== country.flag)
      );
      this.setState({flags});
    }
  }

  clearData = ()=>{
    this.setState({continents : [],
      countries: [],
      flags: [],
      selectedContinent: ''})
  }

  onSearchCountry = (e)=>{
    if(e.target.value.length > 0){
      let countries = this.state.countries.filter((item)=>
        ( item.name.toLowerCase().startsWith(e.target.value.toLowerCase()))
      );
      this.setState({countries})
    }
    else{
      this.setState({countries: this.state.allCountries})
    }
  }

  
  render(){
    return (
      <div className="App">
        <div className="App-header">
            <h3>Flag Picker</h3>
            <p>This app will help you to learn flags around the world in 3 steps</p>
        </div>
        <div className="searchbar">
          <div className="firstInput">
            <p>Step 1</p>
            <p>Select a Continent</p>
            <input type="text" className='searchInput' onFocus={this.continentFocus} onChange={(e)=>this.onSearch(e)}/>
            {this.state.selectedContinent.length === 0 &&
              this.state.continents.map((item)=>
                (
                  <div className="continents" onClick={()=>{this.onSelectContinent(item)}}>{item.continent}</div>
                )
              )
            }
           {this.state.selectedContinent.length !== 0 && <h2>You Selected {this.state.selectedContinent}</h2>} 
          </div>       
          <div className="secondInput">
          {this.state.selectedContinent.length !== 0 &&
            <>
            <p>Step 2</p>
            <p>Now Select a Country</p>
            <input type="text" className='searchInput' onChange={(e)=>this.onSearchCountry(e)}/>
            {
              this.state.countries.map((item)=>
              (
                  <div className="countries">
                  <input type="checkbox" name={item.name} onChange={(e)=>{this.onChangeCountry(e.target.checked,item)}}/>{item.name}</div>
                )
              )
            }
            </>
          }
          </div>
          <div className="flags">
            <div className="">
          {
              this.state.flags.map((item)=>
                (
                  <span className="flag">
                  {item}</span>
                )
              )
            }
            </div>
            {this.state.flags.length > 0 &&
            <button onClick={this.clearData}>Clear Flags</button>}
          </div>
        </div>
      </div>
    );
  }
  
}

export default App;
