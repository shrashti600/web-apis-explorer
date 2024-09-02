import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // useNavigate instead of useHistory
import styled from "styled-components";
import { ApiService } from "../types/apiType";

const DetailsContainer = styled.div`
  padding: 2rem;
  background: #4b7393;
  color: white;
  height: 100vh;
  width: 100vw;
  position: relative;
`;

const Logo = styled.img`
  width: 60px;
  height: 60px;
  margin-right: 8px;
`;

const ExploreButton = styled.button`
  position: absolute;
  bottom: 2rem; /* Positioned at the bottom of the container */
  left: 50%; /* Center horizontally */
  transform: translateX(-50%); /* Offset by half its width */
  padding: 1rem 2rem;
  background-color: #4dbde3;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    background-color: #2c4b63;
  }
`;

const ApiDetailsPage: React.FC = () => {
  const { providerName } = useParams<{ providerName: string }>();
  const [services, setServices] = useState<ApiService[]>([]);
  const navigate = useNavigate(); // useNavigate hook

  useEffect(() => {
    if (providerName) {
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
    }
  }, [providerName]);

  const handleExploreMore = () => {
    navigate("/"); // Navigate back to the homepage or API explorer
  };

  return (
    <DetailsContainer>
      {services.map((service) => (
        <div key={service.id}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {service?.logo && <Logo src={service.logo} alt={service.title} />}
            <h1>{service.title}</h1>
          </div>

          <div style={{ margin: "30px" }}>
            <h2>Description</h2>
            <p>{service.description}</p>
          </div>
          <div style={{ margin: "30px" }}>
            <h2>Swagger</h2>
            <p>{service.swaggerUrl}</p>
          </div>

          {service?.contact && (
            <div style={{ margin: "30px" }}>
              <h2>Contact</h2>
              <p>Email: {service?.contact?.email}</p>
              <p>Name: {service?.contact?.name}</p>
              <p>Url: {service?.contact?.url}</p>
            </div>
          )}
        </div>
      ))}
      
      {/* Add the explore more APIs button */}
      <ExploreButton onClick={handleExploreMore}>
        Explore More APIs
      </ExploreButton>
    </DetailsContainer>
  );
};

export default ApiDetailsPage;
