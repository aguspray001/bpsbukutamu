"use client";

import {
  Button,
  Checkbox,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Option,
  Select,
  Typography
} from "@material-tailwind/react";
import React from "react";
import Swal from "sweetalert2";

function Hero() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);
  
  const saveData = async () => {
    // Example usage
    handleOpen();
    Swal.fire({
      title: "Sukses!",
      text: "Terimakasih telah mengisi buku tamu.",
      icon: "success",
    });
  };

  return (
    <div className="relative min-h-screen w-full bg-[url('/image/sidoarjo-bg.jpg')] bg-cover bg-no-repeat">
      <div className="absolute inset-0 h-full w-full bg-gray-900/60" />
      <div className="grid min-h-screen px-8">
        <div className="container relative z-10 my-auto mx-auto grid place-items-center text-center">
          <Typography variant="h3" color="white" className="mb-2">
            Selamat Datang
          </Typography>
          <Typography variant="h1" color="white" className="lg:max-w-3xl">
            Web Profile BPS Sidoarjo
          </Typography>
          <Typography
            variant="lead"
            color="white"
            className="mt-1 mb-12 w-full md:max-w-full lg:max-w-2xl"
          >
            Pusat arahan akses publikasi, berita, data sensus dan narahubung BPS
            Sidoarjo.
          </Typography>
          <div className="flex items-center gap-4">
            <Button onClick={handleOpen} variant="gradient" color="white">
              Buku Tamu
            </Button>
            <Dialog open={open} handler={handleOpen}>
              <DialogHeader>Buku Tamu - Isi Data Diri Anda.</DialogHeader>
              <DialogBody>
                <Typography className="mb-2 mt-2" variant="h6">
                  Nama Anda
                </Typography>
                <Input
                  label="Nama Lengkap Anda"
                  size="md"
                  crossOrigin={undefined}
                />
                <Typography className="mb-2 mt-2" variant="h6">
                  Alamat
                </Typography>
                <Input label="Alamat Anda" size="md" crossOrigin={undefined} />
                <Typography className="mb-2 mt-2" variant="h6">
                  Instansi
                </Typography>
                <Input
                  label="Instansi Anda (Bila ada)"
                  size="md"
                  crossOrigin={undefined}
                />
                <Typography className="mb-2 mt-2" variant="h6">
                  Tujuan Mengunjungi Web
                </Typography>
                <Select label="Pilih Tujuan Anda">
                  <Option>Mencari Data Sensus</Option>
                  <Option>Membaca Berita</Option>
                  <Option>Membaca Publikasi</Option>
                </Select>
                <div className="-ml-2.5 mt-3">
                  <Checkbox
                    label="Anda yakin data anda sudah benar?"
                    crossOrigin={undefined}
                  />
                </div>
              </DialogBody>
              <DialogFooter>
                <Button
                  variant="text"
                  color="red"
                  onClick={handleOpen}
                  className="mr-1"
                >
                  <span>Batalkan</span>
                </Button>
                <Button variant="gradient" color="green" onClick={saveData}>
                  <span>Simpan</span>
                </Button>
              </DialogFooter>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
