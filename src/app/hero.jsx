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
import React, { useEffect } from "react";
import Swal from "sweetalert2";

function Hero() {
  const [open, setOpen] = React.useState(false);
  const [bgCount, setBGCount] = React.useState(0);

  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    const intervalID = setInterval(() => {
      if(bgCount >= 3 || bgCount === 0){
        setBGCount(0)
      }
      setBGCount(prevBGCount => prevBGCount + 1);
      console.log(`bg-[url('/image/sidoarjo-bg-${bgCount}.jpg')]`)
    }, 3000);
    return () => clearInterval(intervalID);
  }, [bgCount])

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
    <div className={`relative min-h-screen w-full bg-[url('/image/sidoarjo-bg-${bgCount}.jpg')] bg-cover bg-no-repeat`}>
      <div className="absolute inset-0 h-full w-full bg-gray-900/60" />
      <div className="grid min-h-screen px-8">
        <div className="container relative z-10 my-auto mx-auto grid place-items-center text-center">
          <Typography variant="h3" color="white" className="mb-2">
            Pelayanan Statistik Terpadu
          </Typography>
          <Typography variant="h3" color="white" className="lg:max-w-3xl">
            Selamat Datang
          </Typography>
          <Typography variant="h1" color="white" className="lg:max-w-3xl">
            E-Library BPS Kabupaten Sidoarjo
          </Typography>
          {/* <Typography
            variant="lead"
            color="white"
            className="mt-1 mb-12 w-full md:max-w-full lg:max-w-2xl"
          >
            Pusat arahan akses publikasi, berita, data sensus dan narahubung BPS
            Sidoarjo.
          </Typography> */}
          <div className="flex items-center gap-4 mt-10">
            <Button size="lg" onClick={handleOpen} variant="gradient" color="white">
              Buku Tamu
            </Button>
            <Dialog open={open} handler={handleOpen}>
              <DialogHeader>Buku Tamu - Isi Data Diri .</DialogHeader>
              <DialogBody className="w-full h-[300px] overflow-x-hidden overflow-y-auto">
                <Typography className="mb-2 mt-2" variant="h6">
                  Nama
                </Typography>
                <Input
                  label="Nama Lengkap "
                  size="md"
                  crossOrigin={undefined}
                />
                <Typography className="mb-2 mt-2" variant="h6">
                  Tahun Lahir
                </Typography>
                <Input
                  label="Tanggal Lahir "
                  size="md"
                  crossOrigin={undefined}
                />
                <Typography className="mb-2 mt-2" variant="h6">
                  Email
                </Typography>
                <Input
                  label="Email "
                  size="md"
                  crossOrigin={undefined}
                />
                <Typography className="mb-2 mt-2" variant="h6">
                  Nomor Whatsapp
                </Typography>
                <Input
                  label="Nomor Whatsapp "
                  size="md"
                  crossOrigin={undefined}
                />
                <Typography className="mb-2 mt-2" variant="h6">
                  Jenis Kelamin
                </Typography>
                <Select label="Pilih Jenis Kelamin ">
                  <Option>Laki-Laki</Option>
                  <Option>Perempuan</Option>
                </Select>
                <Typography className="mb-2 mt-2" variant="h6">
                  Pendidikan Tertinggi
                </Typography>
                <Select label="Pilih Pendidikan Tertinggi ">
                  <Option>{"≤ SLTA/Sederajat"}</Option>
                  <Option>D4 / S1</Option>
                  <Option>S2</Option>
                  <Option>S3</Option>
                </Select>
                <Typography className="mb-2 mt-2" variant="h6">
                  Pekerjaan Utama
                </Typography>
                <Select label="Pilih Pendidikan Tertinggi ">
                  <Option>Pelajar/Mahasiswa</Option>
                  <Option>Peneliti/Dosen</Option>
                  <Option>ASN/TNI/Polri</Option>
                  <Option>Pegawai BUMN/BUMD</Option>
                  <Option>Swasta</Option>
                  <Option>Lainnya</Option>
                </Select>
                <Typography className="mb-2 mt-2" variant="h6">
                  Nama Instansi
                </Typography>
                <Input
                  label="Instansi  (Bila ada)"
                  size="md"
                  crossOrigin={undefined}
                />
                <Typography className="mb-2 mt-2" variant="h6">
                  Kategori Instansi/Lembaga
                </Typography>
                <Select label="Pilih Kategori Instansi/Lembaga">
                  <Option>Lembaga Negara</Option>
                  <Option>Kementrian & Lembaga Pemerintah</Option>
                  <Option>TNI/Polri/BIN/Kejaksaan</Option>
                  <Option>Pemerintah Daerah</Option>
                  <Option>Lembaga Internasional</Option>
                  <Option>Lembaga Penelitian & Pendidikan</Option>
                  <Option>BUMN/BUMD</Option>
                  <Option>Swasta</Option>
                  <Option>Lainnya</Option>
                </Select>
                <Typography className="mb-2 mt-2" variant="h6">
                  Pemanfaatan Utama Hasil Kunjungan Web
                </Typography>
                <Select label="Pilih Tujuan">
                  <Option>Tugas Sekolah/Tugas Kuliah</Option>
                  <Option>Pemerintahan</Option>
                  <Option>Komersial</Option>
                  <Option>Penelitian</Option>
                  <Option>Lainnya</Option>
                </Select>
                <div className="-ml-2.5 mt-3">
                  <Checkbox
                    label=" yakin data  sudah benar?"
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
