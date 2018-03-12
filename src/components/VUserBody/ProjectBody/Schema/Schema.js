import React, { Component } from 'react';
import './schema.scss';
import SchemaItem from './SchemaItem/SchemaItem';
import { createProjectSchema, findProjectSchemas, updateProjectSchema, deleteProjectSchema } from '../../../../services/project.schema.services';
import { connect } from 'react-redux';

class Schema extends Component {
  constructor(props){
    super(props);
    this.state={
      schemas: []
    };
    this.addSchemaItemHandler = this.addSchemaItemHandler.bind(this);
    this.removeSchemaItemHandler = this.removeSchemaItemHandler.bind(this);
    this.handleSchemaNameChange = this.handleSchemaNameChange.bind(this);
    this.handleSchemaDataChange = this.handleSchemaDataChange.bind(this);
    this.handleSaveChange = this.handleSaveChange.bind(this);
    this.pullFromBackend = this.pullFromBackend.bind(this);
  }

  scrollToBottom = () => {
    this.listEnd.scrollIntoView({ behavior: "smooth" });
  }

  componentWillMount(){
    const projectid = this.props.projectInfo.id;
    this.pullFromBackend(projectid);
  }

  pullFromBackend(projectid, scrollOption){
    findProjectSchemas(projectid)
      .then( res => {
        if (res.status !== 200) {
          console.log(res);
        }
        else {
          this.setState({ schemas: res.data})
          if(scrollOption === 'yesScroll'){
            this.scrollToBottom();
          }
        }
      })
      .catch(err => {throw err});
  }



  handleSubmitSchema(index){
    const projectid = this.props.projectInfo.id
    const {schema_name, database_type, schema_data} = this.state.schemas[index];
    const reqBody = {
      schemaName: schema_name,
      databaseType: database_type,
      schemaData: schema_data
    };

    const schemaid = Number(this.state.schemas[index].id);
    updateProjectSchema(projectid, schemaid, reqBody)
      .then( res => {
        if(res.status !== 200){
          alert(res);
        }
      })
      .catch(err => {throw err});
  }

  addSchemaItemHandler(){
    const projectid = this.props.projectInfo.id;
    const reqBody = {schemaName: 'Type name here', databaseType: 'SQL', schemaData: ''};
    createProjectSchema(projectid, reqBody)
      .then( res => {
        if (res.status !== 200){
          alert(res);
        }
        else{
          this.pullFromBackend(projectid, 'yesScroll');
        }
      })
      .catch(err => {throw err});
  }

  removeSchemaItemHandler(index){
    const projectid = this.props.match.params.projectid;
    const schemaid = this.state.schemas[index].id;
    deleteProjectSchema(projectid, schemaid)
      .then( res => {
        if (res.status !== 200){
          console.log(res);
        }
        else {
          const newState = this.state.schemas;
          newState.splice(index, 1);
          this.setState( { schemas: newState } );
        }
      })
      .catch( err => {throw err});
  }

  handleSchemaNameChange(newName, index){
    const newState = this.state.schemas;
    newState[index].schema_name = newName;
    this.setState({ schemas: newState })
  }

  handleSchemaDataChange(newSchemaData, index){
    const newState = this.state.schemas;
    newState[index].schema_data = newSchemaData;
    this.setState({ schemas: newState });
  }

  handleSaveChange(e, index) {
    const projectid = this.props.projectInfo.id;
      const schemaid = this.state.schemas[index].id;
      const reqBody = {
          schemaName: this.state.schemas[index].schema_name,
          databaseType: this.state.schemas[index].database_type,
          schemaData: this.state.schemas[index].schema_data,
      };

      updateProjectSchema(projectid, schemaid, reqBody)
        .then( res => {
            if (res.status !== 200) {
                console.log(res);
            }
        })
        .catch(err => {throw err});

  }


  render() {
    const projectid = this.props.projectInfo.id;
    const schemas = this.state.schemas;
    const displaySchemas = schemas.map( (schema, index) => {
      let id = schema.id;
        return <SchemaItem
                  key={`schemaItem${index}`}
                  id={id}
                  index={index}
                  schemaName={schema.schema_name}
                  projectid={projectid}
                  databaseType={schema.database_type}
                  schemaData={schema.schema_data}

                  //methods
                  removeSchemaItemHandler={this.removeSchemaItemHandler}
                  handleSchemaNameChange={this.handleSchemaNameChange}
                  handleSchemaDataChange={this.handleSchemaDataChange}
                  handleSubmitSchema={this.handleSubmitSchema}
                  handleSaveChange={this.handleSaveChange}
                />
    })
    return (

            <div className="schema-container">
              <div className="container-wrapper">
              <div className="schema-wrapper">
                <div className="project-section-header">Schema</div>
                <div className="table-list-container">

                    {displaySchemas}
                  <div className="add-button-footer" ref={(el) => { this.listEnd = el; }}>
                        <button className="add-table" onClick={this.addSchemaItemHandler}  > Add Item </button>
                  </div>
                </div>
              </div>
              </div>
            </div>
    );
  }
}

function mapStateToProps(state){
  return state
}

export default connect(mapStateToProps) (Schema);