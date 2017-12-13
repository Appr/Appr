import React, { Component } from 'react';
import './schema.scss';
import ProjectSetupSidebar from '../ProjectSetupSidebar/ProjectSetupSidebar';
import Header from '../../../Header/Header';


class Schema extends Component {
  constructor(props){
    super();
    this.state={
      schemas: [{
            tables: [{
                key: 1,
                name: 'Table name'
              }],
            columns:[{
                key: 1,
                name: '',
                type: '',
                size: '',
                primaryKey: false,
                foreignKey: false,
                autoIncrement: false,
                notNull: false,
                uniqueReference: false
              }]
            
      }]
    }
    this.addSchemaItemHandler = this.addSchemaItemHandler.bind(this);
    this.removeSchemaItemHandler = this.removeSchemaItemHandler.bind(this);
  }

  addSchemaItemHandler(){
    let SchemaList = this.state.schemas;
    SchemaList.push({
      tables: [{
          key: 1,
          name: 'Table name'
        }],
      columns:[{
          key: 1,
          name: '',
          type: '',
          size: '',
          primaryKey: false,
          foreignKey: false,
          autoIncrement: false,
          notNull: false,
          uniqueReference: false
        }]
    })
    this.setState({schemas: SchemaList})
  }

  removeSchemaItemHandler(){
    let SchemaList = this.state.schemas;
    SchemaList.splice(1,1);
    this.setState({schemas: SchemaList})
  }

  render() {
    const displaySchemas = this.state.schemas.map( schema => {
        return(
          <div className="schema-item">
          <div className="project-item-header">
            <span onClick={this.removeSchemaItemHandler}> </span>
          </div>
            <div className="name-table-row">
              <input className="name-table" type="text" placeholder="Table Name" />
            </div>
                <div className="column-item">
                  <div className="column-fields-wrapper">
                    <input className="column-input-text md-input" type ="text" placeholder="Column Name" />
                    <select className="column-input-select sm-input" required placeholder="type">
                      <option value="">type </option>
                      <option value="">DATE</option>
                      <option value="">INTEGER</option>
                      <option value="">TEXT</option>
                      <option value="">VARCHAR</option>
                      <option value="">CHAR</option>
                    </select>
                              
                    <input className="schema-column-text sm-input" type ="text" placeholder="Size" />
                  </div>
                    <div className="column-checkbox-wrapper">
                          <div className="column-checkbox">
                            <label> pk </label>
                            <input type="checkbox" />
                          </div>

                          <div className="column-checkbox">
                            <label> fk </label>
                            <input type="checkbox" />
                          </div>

                          <div className="column-checkbox">
                            <label> ai </label>
                            <input type="checkbox" />
                          </div>

                          <div className="column-checkbox">
                            <label> nn </label>
                            <input type="checkbox" />
                          </div>

                      <div className="column-checkbox">
                        <label> ur </label>
                        <input type="checkbox" />
                      </div>
                    </div>
                    <div className="remove-row">
                      <span className="delete-x">&times;</span> 
                    </div>
                </div>     
            <div className="column-item-footer">
              <button className="add-button"> <span/> Add Column </button>
            </div>
          </div>
        )
    })
    return (
      <div>
      <Header />
        <div className="main-fix">
          <ProjectSetupSidebar />
            <div className="schema-container">
              <div className="schema-wrapper">
                <div className="project-section-header">Schema</div>
                <div className="table-list-container">
                    {displaySchemas}
                  <button className="add-table" onClick={this.addSchemaItemHandler}> Add Table </button>
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default Schema;