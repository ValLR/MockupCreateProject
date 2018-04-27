import React, { Component } from 'react'
import '../createProjectPage.css'
import FA from '@fortawesome/react-fontawesome'
import { faSearch, faTimesCircle } from '@fortawesome/fontawesome-free-solid'
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
      warning:'',
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
    if(!this.selectedResources.includes(resource)) {
      this.selectedResources.push(resource)
    }
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
    if(this.state.canonicalName === '' || this.selectedResources.length === 0){
      this.setState({
        warning: true
      })
    }
    console.log('Nombre del nuevo proyecto:', this.state.canonicalName,'Recursos seleccionados:',this.selectedResources)
    event.preventDefault();
  }

  render() {
    const filteredResources = repositories.filter((resource) => {
      return resource.name.toLowerCase().includes(this.state.search.toLowerCase())
    })
    return(
      <div className='page-container'>
        <form className='submitForm' onSubmit={this.handleSubmit}>
          <div className='name-index'>
            <input type='text' id='newProject' value={this.state.canonicalName} onChange={this.handleChange.bind(this)}/>
            <p>Elige un nombre para el proyecto</p>
            {this.state.warning&&this.state.canonicalName === '' ? 'Éste campo es obligatorio' : ''}
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
              <div className='list-container'>
                {this.selectedResources.length !== 0 ? this.selectedResources.map((repository) => 
                  <div key={repository.id} className='listRow'>
                    <ListIcon resource={repository} mode={'small'}/><a onClick={(e) => this.handleDelete(e, repository)}><FA id='delete' icon={faTimesCircle}/></a>
                  </div> ) : <p className='noResourcesYet'>No has seleccionado ningún recurso aún</p>}
              </div>
              {this.state.warning&&this.selectedResources.length === 0 ? 'Por favor, elige al menos un recurso' : ''}
            </div>
          </div>
          <input id='submit' type='submit' value='Crear Proyecto'/>
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
      this.props.mode === 'medium' ?
        <div className='resourceButton'>
          <img alt='' width='45' height='45' src={icon}/>
          <p>{this.props.resource.name}</p>
        </div>
      :<div className='listButton'>
        <img alt='' width='20' height='20' src={icon}/>
        <p>{this.props.resource.name}</p>
      </div>
    )
  }
}

export default CreateProjectPage
