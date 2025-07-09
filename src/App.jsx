import { useState } from "react";
import { Heading, Subheading } from "./catalyst/heading.jsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./catalyst/table.jsx";
import SearchForm from "./components/SearchForm.jsx";
import { StackedLayout } from "./catalyst/stacked-layout.jsx";
import {
  Navbar,
  NavbarDivider,
  NavbarItem,
  NavbarLabel,
  NavbarSection,
  NavbarSpacer,
} from "./catalyst/navbar.jsx";
import {
  Sidebar,
  SidebarBody,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
} from "./catalyst/sidebar.jsx";
import GithubMark from "./icons/GithubMark.jsx";
import Search from "./pages/Search.jsx";

function App() {
  const [item, setItem] = useState(null);
  const [quality, setQuality] = useState("Normal");

  const navItems = [
    { label: "Search", url: "/" },
    { label: "About", url: "/about" },
  ];

  return (
    <StackedLayout
      navbar={
        <Navbar>
          <NavbarLabel className="dark:text-white">Albion Prices</NavbarLabel>
          <NavbarDivider className="max-lg:hidden" />
          <NavbarSection className="max-lg:hidden">
            {navItems.map(({ label, url }) => (
              <NavbarItem key={label} href={url}>
                {label}
              </NavbarItem>
            ))}
          </NavbarSection>
          <NavbarSpacer />
          <NavbarSection>
            <NavbarItem
              href="https://github.com/"
              target="_blank"
              aria-label="Search"
              className="fill-black dark:fill-gray-500 hover:fill-gray-700 dark:hover:fill-white"
            >
              <GithubMark className="size-6" />
            </NavbarItem>
          </NavbarSection>
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarHeader>
            <SidebarLabel>Tailwind Labs</SidebarLabel>
          </SidebarHeader>
          <SidebarBody>
            <SidebarSection>
              {navItems.map(({ label, url }) => (
                <SidebarItem key={label} href={url}>
                  {label}
                </SidebarItem>
              ))}
            </SidebarSection>
          </SidebarBody>
        </Sidebar>
      }
    >
      <Search />
    </StackedLayout>
  );
}

export default App;
