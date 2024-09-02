import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ApiService } from "../types/apiType";

interface ApiProviderListProps {
  providerName: string;
  onSelectApiService: (service: string) => void;
}

const ListContainer = styled.div`
  margin-left: 320px; /* Adjust for sidebar */
  padding: 1rem;
`;

const ServiceItem = styled.div`
  margin: 0.5rem 0;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const ApiProviderList: React.FC<ApiProviderListProps> = ({
  providerName,
  onSelectApiService,
}) => {
  const [services, setServices] = useState<ApiService[]>([]);

  useEffect(() => {
    fetch(`https://api.apis.guru/v2/${providerName}.json`)
      .then((response) => response.json())
      .then((data) => {
        const serviceList = Object.keys(data.apis).map((key) => ({
          id: key,
          title: data.apis[key].info.title,
          description: data.apis[key].info.description,
          swaggerUrl: data.apis[key].swaggerUrl,
          link: data.apis[key].info["x-origin"][0].url,
          logo: data.apis[key].info["x-logo"]?.url,
          contact: data.apis[key].info.contact,
        }));
        setServices(serviceList);
      });
  }, [providerName]);

  return (
    <ListContainer>
      {services.map((service) => (
        <ServiceItem
          key={service.id}
          onClick={() => onSelectApiService(service.id)}
        >
          {service.title}
        </ServiceItem>
      ))}
    </ListContainer>
  );
};

export default ApiProviderList;
