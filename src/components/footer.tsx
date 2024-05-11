import {
  Typography,
  Button,
  IconButton,
  Checkbox,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { Document, Page, pdfjs } from "react-pdf";
import Image from "next/image";
import React from "react";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const LINKS = ["Maklumat Pelayanan", "Standar Pelayanan"];

export function Footer() {
  const [open, setOpen] = React.useState({state: false, menu: ""});
  const [numPages, setNumPages] = React.useState<number>(0);
  const [pageNumber, setPageNumber] = React.useState<number>(1); // start on first page
  const [loading, setLoading] = React.useState(true);
  const [pageWidth, setPageWidth] = React.useState(0);

  function onDocumentLoadSuccess(e: any) {
    console.log(e._pdfInfo.numPages);
    // setNumPages(e.numPages);
  }

  function onPageLoadSuccess() {
    setPageWidth(window.innerWidth);
    setLoading(false);
  }

  const options = {
    cMapUrl: "cmaps/",
    cMapPacked: true,
    standardFontDataUrl: "standard_fonts/",
  };

  // Go to next page
  function goToNextPage() {
    setPageNumber((prevPageNumber) =>
      prevPageNumber >= 13 ? 13 : prevPageNumber + 1
    );
  }

  function goToPreviousPage() {
    setPageNumber((prevPageNumber) =>
      prevPageNumber <= 1 ? 1 : prevPageNumber - 1
    );
  }

  const handleOpen = (menu:string) => setOpen({
    state: !open.state,
    menu: menu
  });

  return (
    <footer className="pb-5 p-10 md:pt-10 mb-10">
      <div className="container flex flex-col mx-auto">
        <div className="flex flex-col md:flex-row items-center !justify-between">
          <div className="flex md:flex-row items-center justify-between gap-2">
            <Image
              src={"/logos/logo-bps.png"}
              alt="logo-bps"
              width={100}
              height={100}
            />
            <div className="flex flex-col justify-start">
              <Typography variant="small" className="text-gray-900">
                Badan Pusat Statistik Sidoarjo
              </Typography>
              <Typography variant="small" className="text-gray-900">
                Jl. Pahlawan No. 140 - Sidoarjo
              </Typography>
              <Typography variant="small" className="text-gray-900">
                Telp: (031) 8941744
              </Typography>
              <Typography variant="small" className="text-gray-900">
                Email: bps3515@bps.go.id
              </Typography>
            </div>
          </div>
          <ul className="flex flex-col justify-center my-4 md:my-0 w-max mx-auto items-center gap-4">
            {LINKS.map((link, index) => (
              <li key={index}>
                <Typography
                  variant="small"
                  color="white"
                  onClick={()=>handleOpen(link)}
                  className="font-normal !text-gray-700 hover:!text-gray-900 transition-colors"
                >
                  {link}
                </Typography>
                <Dialog size="lg" open={open.state} handler={() => console.log("")}>
                  <DialogHeader className="w-full">
                    <div className="flex flex-row items-center justify-between w-full px-5">
                      <p>{open.menu}</p>
                      {
                        open.menu === "Standar Pelayanan" &&
                        <div className="flex flex-row items-center justify-between">
                        <button
                          onClick={goToPreviousPage}
                          className="text-black px-2 hover:text-gray-600"
                        >
                          <span className="text-sm">Previous</span>
                        </button>
                        <button
                          onClick={goToNextPage}
                          className="text-black px-2 hover:text-gray-600"
                        >
                          <span className="text-sm">Next</span>
                        </button>
                      </div>
                      }
                    </div>
                  </DialogHeader>
                  <DialogBody className="w-full h-[450px] overflow-x-hidden overflow-y-auto">
                    {open.menu === "Standar Pelayanan" ? (
                      <div
                        hidden={loading}
                        style={{ height: "calc(100vh - 64px)" }}
                        className="flex items-center"
                      >
                        <div className="px-5 w-5/6 h-full flex justify-center mx-auto">
                          <Document
                            file={"/files/std-pelayanan.pdf"}
                            options={options}
                            renderMode="canvas"
                            className=""
                          >
                            <Page
                              className=""
                              key={pageNumber}
                              pageNumber={pageNumber}
                              renderAnnotationLayer={false}
                              renderTextLayer={false}
                              onLoadSuccess={onPageLoadSuccess}
                              onRenderError={() => setLoading(false)}
                              width={Math.max(pageWidth * 0.5, 300)}
                            />
                          </Document>
                        </div>
                      </div>
                    ) : (
                      <Image src={"/image/maklumat-pelayanan-24.png"} alt="maklumat pelayanan 2024" fill />
                    )}
                  </DialogBody>
                  <DialogFooter>
                    <Button
                      variant="text"
                      color="red"
                      onClick={()=>handleOpen(link)}
                      className="mr-1"
                    >
                      <span>Close</span>
                    </Button>
                  </DialogFooter>
                </Dialog>
              </li>
            ))}
          </ul>
          <div className="flex flex-col justify-center items-center">
            <Typography>Media Sosial:</Typography>
            <div className="flex w-fit justify-center gap-2">
              <IconButton size="sm" color="gray" variant="text">
                <a href="https://x.com/bpskabsidoarjo">
                  <Image
                    src={"/logos/logo-twitter.png"}
                    alt="twitter logo"
                    width={40}
                    height={40}
                  />
                </a>
              </IconButton>
              <IconButton size="sm" color="gray" variant="text">
                <a href="www.youtube.com/@bpskabupatensidoarjo3550">
                  <i className="fa-brands fa-youtube text-lg" />
                </a>
              </IconButton>
              <IconButton size="sm" color="gray" variant="text">
                <a href="https://instagram.com/bps.sidoarjo">
                  <i className="fa-brands fa-instagram text-lg" />
                </a>
              </IconButton>
              <IconButton size="sm" color="gray" variant="text">
                <a href="https://id-id.facebook.com/statistik.sidoarjo/">
                  <i className="fa-brands fa-facebook text-lg" />
                </a>
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
