import React, { Component } from 'react'
import '../createProjectPage.css'
import FA from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/fontawesome-free-solid'
import gitIcon from '../images/github.png'
import pivIcon from '../images/pivotal.png'
import codeIcon from '../images/codeship.png'
import paperIcon from '../images/papertrail.png'
import sentryIcon from '../images/sentry.png'


const repositories = [
  {
    id:1,
    name:'Unholster-api',
    service: 'github'
  }, {
    id:2,
    name:'Unholster-api',
    service: 'codeship'
  }, {
    id:3,
    name:'Unholster-API (Producción)',
    service: 'github'
  }, {
    id:4,
    name:'Backyard',
    service:'codeship'
  }, {
    id:5,
    name: 'Backyard',
    service: 'github'
  }, {
    id:6,
    name: 'DecideChile',
    service: 'pivotal'
  }, {
    id:7,
    name: 'DecideChile',
    service: 'github'
  }, {
    id:8,
    name:'DecideChile',
    service: 'codeship'
  }, {
    id:9,
    name: 'DecideChile-Back',
    service: 'github',
  }, {
    id:10,
    name: 'Cobranza',
    service: 'github'
  }, {
    id:11,
    name: 'Cobranza',
    service: 'papertrail'
  }, {
    id:12,
    name: 'Cobranza',
    service: 'codeship'
  }, {
    id:13,
    name: 'Enel-desktop',
    service: 'github'
  }, {
    id:14,
    name: 'Enel-Service',
    service:'github'
  },{
    id:15,
    name:'CEN-SIP',
    service: 'sentry'
  }, {
    id:16,
    name:'CEN-SIP',
    service:'github'
  }
]

class CreateProjectPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      canonicalName: '',
      search: '',
    }
    this.selectedResources = []
    this.handleChange = this.handleChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event){
    this.setState({
      canonicalName: event.target.value
    })
  }

  handleSelect(e, resource){
    this.selectedResources.includes(resource) ? '' : this.selectedResources.push(resource)
    this.forceUpdate()
  }

  handleDelete(e, resource) {
    this.selectedResources.pop(resource)
    this.forceUpdate()
  }

  updateSearch(event){
    this.setState({
      search: event.target.value,
    })
  }

  handleSubmit(event){
    console.log(this.selectedResources)
    event.preventDefault();
  }

  render() {
    const filteredResources = repositories.filter((resource) => {
      return resource.name.toLowerCase().includes(this.state.search.toLowerCase())
    })
    return(
      <div className='page-container'>
        <form onSubmit={this.handleSubmit}>
          <div className='name-index'>
            <input type='text' id='newProject' value={this.state.canonicalName} onChange={this.handleChange.bind(this)}/>
            <p>Elige un nombre para el proyecto</p>
          </div>
          <div className='projects-container'>
            <div className='allResources-container'>
              <div className='searchbar-container'>
                <div className='wrapper'>
                  <FA id='search' icon={faSearch}/>
                  <input type='text' id='project-searchBar' value={this.state.search} onChange={this.updateSearch.bind(this)} placeholder='Buscar Recursos'/>
                </div>
              </div>
              <div className='allResources-List'>
                {filteredResources.map((resource) => 
                  <div key={resource.id} className='resource'>
                    <a onClick={(e) => this.handleSelect(e, resource)}>
                      <ListIcon resource={resource} mode={'medium'}/>
                    </a>
                  </div>)}
              </div>
            </div>
            <div className='selected-container'>
              <p>Recursos Seleccionados</p>
              <ul>
                {this.selectedResources.length !== 0 ? this.selectedResources.map((repository) => 
                  <li key={repository.id}>{repository.name} <a onClick={(e) => this.handleDelete(e, repository)}>x</a></li>) : ''}
              </ul>
            </div>
          </div>
          <input type='submit'/>
        </form>
      </div>
    )
  }
}

class ListIcon extends Component {
  render(){
    const icon = {
      github: gitIcon,
      pivotal: pivIcon,
      codeship: codeIcon,
      papertrail: paperIcon,
      sentry: sentryIcon 
    }[this.props.resource.service]

    return(
      <div className='resourceButton'>
        <img width='45' height='45' src={icon}/>
        <p>{this.props.resource.name}</p>
      </div>
    )
  }
}

export default CreateProjectPage
