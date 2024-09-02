import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ApiService } from "../types/apiType";
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface SidebarProps {
  onSelectProvider: (provider: string) => void;
}

const SidebarContainer = styled.div`
  width: 400px;
  background: #4b7393;
  color: white;
  margin: 10px;
  padding: 1rem;
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  overflow-y: auto;
`;

const ProviderItem = styled.div`
  margin: 0.5rem 0;
  cursor: pointer;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between; /* Aligns content to left and right */
`;
const ProviderChildItem=styled.div`
    margin: 0.5rem 0;
  cursor: pointer;
  color: white;
  align-items: center;
`

interface CollapseButtonProps {
  isExpanded: boolean;
}

const CollapseButton = styled.button<CollapseButtonProps>`
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  padding: 0;
  color: white; /* Color for button text */
  display: flex;
  align-items: center;
  margin-left: 8px;
  &:hover {
    text-decoration: underline;
  }
`;

const Logo = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

const UrlList = styled.ul`
  list-style: none;
  padding-left: 1rem;
  margin-top: 0.5rem;
  color: white; /* Color for list items */
`;

const LoadingMessage = styled.div`
  padding-left: 1rem;
  margin-top: 0.5rem;
  font-style: italic;
  color: white; /* Color for loading message */
`;

const Sidebar: React.FC<SidebarProps> = ({ onSelectProvider }) => {
  const [providers, setProviders] = useState<string[]>([]);
  const [expandedProvider, setExpandedProvider] = useState<string | null>(null);
  const [services, setServices] = useState<ApiService[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("https://api.apis.guru/v2/providers.json")
      .then((response) => response.json())
      .then((data) => {
        setProviders(data.data);
      });
  }, []);

  const toggleProvider = (providerName: string) => {
    if (expandedProvider === providerName) {
      setExpandedProvider(null);
      setServices(null);
    } else {
      setExpandedProvider(providerName);
      setLoading(true);
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
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };

  return (
    <SidebarContainer>
      <h5 style={{ textAlign: "center" }}>Select Provider</h5>
      {providers.map((provider) => (
        <div key={provider}>
          <ProviderItem onClick={() => toggleProvider(provider)}>
            <span>{provider}</span>
            <CollapseButton
              isExpanded={expandedProvider === provider}
              
            >
              {expandedProvider === provider ? <FaChevronUp /> : <FaChevronDown />}
            </CollapseButton>
          </ProviderItem>
          {expandedProvider === provider && (
            <>
              {loading && <LoadingMessage>Loading...</LoadingMessage>}
              {!loading && services && (
                <UrlList>
                  {services.map((service) => (
                    <li key={service.id}>
                      <ProviderChildItem>
                        {service?.logo && (
                          <Logo src={service.logo} alt={service.title} />
                        )}
                        <Link to={`/api/${provider}/${service.id}`}>
                          {service.title}
                        </Link>
                      </ProviderChildItem>
                    </li>
                  ))}
                </UrlList>
              )}
            </>
          )}
        </div>
      ))}
    </SidebarContainer>
  );
};

export default Sidebar;
