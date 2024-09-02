// src/pages/HomePage.tsx
import React, { useState } from "react";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import ApiProviderList from "../components/ApiProviderList";
import ApiServiceDetails from "../components/ApiServiceDetails";
import Overlay from "../components/Overlay";
import { ApiService } from "../types/apiType";

const CenterButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1rem 2rem;
  font-size: 1.2rem;
  cursor: pointer;
  background-color: #4dbde3;
  color: white;
`;

const Container = styled.div`
  background: #4b7393;
  color: white;
  position: relative;
  min-height: 100vh; /* Ensure the container takes full height */
`;

const SidebarContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 400px;
  background: #4b7393;
  color: white;
  padding: 1rem;
  z-index: 1001; /* Ensure sidebar is above the overlay */
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s ease-in-out;
`;

const HomePage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<ApiService | null>(null);

  const handleButtonClick = () => {
    setIsSidebarOpen(true);
  };

  return (
    <Container>
      <CenterButton onClick={handleButtonClick}>
        Explorer web APIs
      </CenterButton>

      <Overlay visible={isSidebarOpen} />

      <SidebarContainer isOpen={isSidebarOpen}>
        <Sidebar onSelectProvider={setSelectedProvider} />
      </SidebarContainer>

      {selectedProvider && !selectedService && (
        <ApiProviderList
          providerName={selectedProvider}
          onSelectApiService={(serviceId: string) => {
            setSelectedService(serviceId as unknown as ApiService);
          }}
        />
      )}
      {selectedService && <ApiServiceDetails service={selectedService} />}
    </Container>
  );
};

export default HomePage;
