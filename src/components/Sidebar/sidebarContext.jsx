import { useState, createContext, useContext } from 'react';
import { ProSidebarProvider } from 'react-pro-sidebar';
import MyProSidebar from 'src/components/Sidebar/Sidebar';

const SidebarContext = createContext({});

export const MyProSidebarProvider = ({ children }) => {
  const [sidebarRTL, setSidebarRTL] = useState(false);

  return (
    <ProSidebarProvider>
      <SidebarContext.Provider
        value={{
          sidebarRTL,
          setSidebarRTL,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: sidebarRTL ? 'row-reverse' : 'row',
          }}
        >
          <MyProSidebar />
          {children}
        </div>
      </SidebarContext.Provider>
    </ProSidebarProvider>
  );
};

export const useSidebarContext = () => useContext(SidebarContext);
