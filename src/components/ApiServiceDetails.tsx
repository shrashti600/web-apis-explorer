import React from 'react'
import styled from 'styled-components'
import { ApiService } from '../types/apiType'

interface ApiServiceDetailsProps {
  service: ApiService
}

const DetailsContainer = styled.div`
  margin-left: 320px; /* Adjust for sidebar */
  padding: 1rem;
`

const ApiServiceDetails: React.FC<ApiServiceDetailsProps> = ({ service }) => {
  return (
    <DetailsContainer>
      <h1>{service.title}</h1>
      <p>{service.description}</p>
      <a href={service.link} target="_blank" rel="noopener noreferrer">
        {service.link}
      </a>
    </DetailsContainer>
  )
}

export default ApiServiceDetails
