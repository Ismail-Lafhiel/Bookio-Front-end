import { Outlet } from "react-router-dom";
import BaseLayout from "./BaseLayout";

const MainLayout = () => {
  return (
    <BaseLayout>
      <Outlet />
    </BaseLayout>
  );
};

export default MainLayout;
