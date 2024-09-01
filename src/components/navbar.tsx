import React from "react";
import {
  Navbar as MTNavbar,
  Collapse,
  Button,
  IconButton,
  Typography,
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import {
  RectangleStackIcon,
  UserCircleIcon,
  CommandLineIcon,
  Squares2X2Icon,
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import Image from "next/image";

interface NavItemProps {
  children: React.ReactNode;
  href?: string;
}

function NavItem({ children, href }: NavItemProps) {
  return (
    <Typography
      as="a"
      href={href || "#"}
      target={href ? "_blank" : "_self"}
      variant="paragraph"
      className="flex items-center gap-2 font-medium"
    >
      {children}
    </Typography>
  );
}

const NAV_MENU = [
  {
    name: "Daftar Buku",
    icon: RectangleStackIcon,
    href: "https://perpustakaan.bps.go.id/opac/search?q=Kabupaten+Sidoarjo&media=no&urut=tahun&page=1",
  },
  {
    name: "Produk BPS",
    icon: Squares2X2Icon,
    href: "https://sidoarjokab.bps.go.id/",
    menu: [
      {
        title: "Tabel Statistik",
        href: "https://sidoarjokab.bps.go.id/site/pilihdata.html",
        name: "Produk BPS"
      },
      {
        title: "Berita Resmi Statistik",
        href: "https://sidoarjokab.bps.go.id/pressrelease.html",
        name: "Produk BPS"
      },
      {
        title: "Galeri Infografis",
        href: "https://sidoarjokab.bps.go.id/galery.html",
        name: "Produk BPS"
      },
      {
        title: "Halo Stasda (Buat Janji Konsultasi)",
        href: " http://s.bps.go.id/HALO-STASDA",
        name: "Produk BPS"
      },
    ],
  },
  {
    name: "Official Website",
    icon: CommandLineIcon,
    href: "https://ppid.bps.go.id/app/konten/3515/Profil-BPS.html",
    menu: [
      {
        title: "BPS Kabupaten Sidoarjo",
        href: "https://sidoarjokab.bps.go.id",
        name: "Official Website"
      },
      {
        title: "BPS Provinsi Jawa Timur", href: "https://jatim.bps.go.id",
        name: "Official Website"
      },
      {
        title: "BPS Republik Indonesia", href: "https://bps.go.id",
        name: "Official Website"
      },
    ],
  },
];

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState({
    state: false,
    menu: "",
  });
  const [isScrolling, setIsScrolling] = React.useState(false);

  const handleOpen = () => setOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false)
    );
  }, []);

  React.useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 0) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <MTNavbar
      shadow={false}
      fullWidth
      blurred={false}
      color={isScrolling ? "white" : "transparent"}
      className="fixed top-0 z-50 border-0 bg-[#001F4F]"
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex flex-row items-center justify-between">
          <Image
            src={`/logos/kop-bps-${isScrolling ? "white" : "white"}.png`}
            width={300}
            height={300}
            alt="logo-bps"
          />
        </div>
        <ul
          className={`ml-10 hidden items-center gap-6 lg:flex ${isScrolling ? "text-gray-900" : "text-white"
            }`}
        >
          {NAV_MENU.map(({ name, icon: Icon, href, menu }, k) => (
            <div className="relative" key={k}>
              <Popover placement="bottom">
                <PopoverHandler>
                  <Button
                    className={`bg-transparent p-0 m-0 shadow-none ${isScrolling ? "text-white" : "text-white"
                      } hover:shadow-none`}
                  >
                    <NavItem
                      data-ripple-light="true"
                      data-popover-target="menu"
                      key={name}
                      href={(name === "Daftar Buku" && href) || ""}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="text-sm">{name}</span>
                    </NavItem>
                  </Button>
                </PopoverHandler>
                {name !== "Daftar Buku" && (
                  <PopoverContent className="w-fit z-[99] mt-3">
                    <ul>
                      {menu?.map((m, k) => (
                        <li
                          key={k}
                          role="menuitem"
                          className="block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                        >
                          <a
                            href={m.href}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            {m.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </PopoverContent>
                )}
              </Popover>
            </div>
          ))}
        </ul>
        <IconButton
          variant="text"
          color={isScrolling ? "gray" : "white"}
          onClick={handleOpen}
          className="ml-auto inline-block lg:hidden"
        >
          {open ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
          )}
        </IconButton>
      </div>
      <Collapse open={open}>
        <div className="container mx-auto mt-4 rounded-lg bg-[#001F4F] px-6 py-5">
          <ul className="flex flex-col gap-4 text-gray-900">
            {NAV_MENU.map(({ name, icon: Icon, href, menu }, k) => (
              <div className="relative" key={k}>
                <Button
                  className={`bg-transparent p-0 m-0 shadow-none ${isScrolling ? "text-white" : "text-white"
                    } hover:shadow-none`}
                  onClick={() =>
                    setOpenDropdown({ state: !openDropdown.state, menu: name })
                  }
                >
                  <NavItem
                    href={(name === "Daftar Buku" && href) || ""}
                  >
                    <Icon className="h-5 w-5" />
                    {name}
                  </NavItem>
                </Button>
                {openDropdown.state && name === openDropdown.menu && (
                  <ul className="bg-white p-5 rounded-md">
                    {menu
                      ?.filter((m) => {
                        console.log(m)
                        return m.name === openDropdown.menu;
                      })
                      .map((m, k) => {
                        console.log(m)
                        return (
                          <li key={k} className="text-sm text-black cursor-pointer w-fit mt-2">
                            <a
                              href={m.href}
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              {m.title}
                            </a>
                          </li>
                        );
                      })}
                  </ul>
                )}
              </div>
            ))}
          </ul>
        </div>
      </Collapse>
    </MTNavbar>
  );
}

export default Navbar;
