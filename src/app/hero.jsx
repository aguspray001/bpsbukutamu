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
  Typography,
} from "@material-tailwind/react";
import React, { useEffect } from "react";
import Swal from "sweetalert2";

function Hero() {
  const [open, setOpen] = React.useState(false);
  const [bgCount, setBGCount] = React.useState(0);
  const [dataPengunjung, setDataPengunjung] = React.useState({
    timestamp: new Date(),
    nama: "",
    email: "",
    nomor_telp: "",
    jenis_kelamin: "",
    pendidikan: "",
    pekerjaan: "",
    instansi: "",
    kategori_instansi: "",
    hasil_kunjungan: "",
    valid: false,
  });

  const resetDataPengunjung = () => {
    setDataPengunjung({
      timestamp: new Date(),
      nama: "",
      email: "",
      nomor_telp: "",
      jenis_kelamin: "",
      pendidikan: "",
      pekerjaan: "",
      instansi: "",
      kategori_instansi: "",
      hasil_kunjungan: "",
      valid: false,
    });
  };

  useEffect(() => {
    resetDataPengunjung();
  }, []);

  const formName = "bukutamubps-form";
  const handleOpen = () => setOpen(!open);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDataPengunjung((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    const intervalID = setInterval(() => {
      if (bgCount >= 2 || bgCount === 0) {
        setBGCount(0);
      }
      setBGCount((prevBGCount) => prevBGCount + 1);
    }, 5000);
    return () => clearInterval(intervalID);
  }, [bgCount]);

  const saveData = async (e, dataPengunjung) => {
    setOpen(!open);

    // check null value in data pengunjung
    const nullDataPengunjung = [];
    for (const key in dataPengunjung) {
      if (dataPengunjung[key] === "" || dataPengunjung[key] === null) {
        nullDataPengunjung.push(key);
      }
    }

    //error if user doesnt fill form fully
    if (nullDataPengunjung.length > 0) {
      e.preventDefault();
      Swal.fire({
        title: "Gagal",
        text: "Mohon mengisi buku tamu dengan baik.",
        icon: "error",
      });
      handleInputChange({ target: { name: "valid", value: false } });
    } else {
      // warning checkbox
      if (dataPengunjung.valid === false) {
        e.preventDefault();
        Swal.fire({
          title: "Warning",
          text: "Mohon klik checkbox jika data sudah benar",
          icon: "warning",
        });
      } else {
        // send data to google sheet and pop out the sukses modal!
        submitToGoogleSheet(dataPengunjung);
      }
    }
  };

  const submitToGoogleSheet = async (dataPengunjung) => {
    console.log(dataPengunjung);
    const scriptURL =
      "https://script.google.com/macros/s/AKfycbzzI14zi_lUftXyfWuUUhBEUJ_FutMnhBPmhztxkLbttdZh6TLP1Ev_JxA3QBwDz9Phsw/exec";
    const form = document.forms[formName];
    let formData = new FormData(form);
    formData.append("jenis_kelamin", dataPengunjung.jenis_kelamin);
    formData.append("pendidikan", dataPengunjung.pendidikan);
    formData.append("pekerjaan", dataPengunjung.pekerjaan);
    formData.append("instansi", dataPengunjung.instansi);
    formData.append("kategori_instansi", dataPengunjung.kategori_instansi);
    formData.append("hasil_kunjungan", dataPengunjung.hasil_kunjungan);

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const resp = await fetch(scriptURL, { method: "POST", body: formData });
      const data = { status: resp.ok, message: "Sukses tersimpan di database" };

      resetDataPengunjung();
      Swal.fire({
        title: data.status ? "Berhasil" : "Gagal",
        text: data.message,
        icon: data.status ? "success" : "error",
      });
    });
  };

  return (
    <div
      className={`relative min-h-screen w-full bg-cover bg-no-repeat object-cover`}
      style={{
        backgroundImage: `url('/image/sidoarjo-bg-${bgCount}.jpg')`,
      }}
    >
      <div className="absolute inset-0 h-full w-full bg-gray-900/60" />
      <div className="grid min-h-screen px-8">
        <div className="container relative z-10 my-auto mx-auto grid place-items-center text-center">
          {bgCount == 1 ? (
            <>
              <Typography variant="h3" color="white" className="mb-2">
                Pelayanan Statistik Terpadu
              </Typography>
              <Typography variant="h3" color="white" className="lg:max-w-3xl">
                Selamat Datang di
              </Typography>
              <Typography variant="h1" color="white" className="lg:max-w-3xl">
                E-Library
              </Typography>
              <Typography variant="h2" color="white" className="lg:max-w-3xl">
                Badan Pusat Statistik Kabupaten Sidoarjo
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="h3" color="white" className="mb-2">
                Pelayanan Data Statistik
              </Typography>
              <Typography variant="h2" color="white" className="lg:max-w-3xl">
                Badan Pusat Statistik Kabupaten Sidoarjo
              </Typography>
            </>
          )}
          <div className="flex items-center gap-4 mt-10">
            <Button
              size="lg"
              onClick={handleOpen}
              variant="gradient"
              color="white"
            >
              Buku Tamu
            </Button>
            <Dialog open={open} handler={handleOpen}>
              <form name={formName}>
                <DialogHeader>Buku Tamu</DialogHeader>
                <DialogBody className="w-full h-[300px] overflow-x-hidden overflow-y-auto">
                  <input
                    name="timestamp"
                    value={new Date()}
                    hidden={true}
                  ></input>
                  <Typography className="mb-2 mt-2" variant="h6">
                    Email
                  </Typography>
                  <Input
                    label="Email "
                    size="md"
                    crossOrigin={undefined}
                    name="email"
                    value={dataPengunjung.email}
                    onChange={handleInputChange}
                  />
                  <Typography className="mb-2 mt-2" variant="h6">
                    Tujuan Kunjungan
                  </Typography>
                  <Select
                    label="Tujuan Kunjungan"
                    name="tujuan"
                    value={dataPengunjung.pekerjaan}
                    onChange={(e) =>
                      handleInputChange({
                        target: { name: "pekerjaan", value: e },
                      })
                    }
                  >
                    <Option value="Pelayanan Statistik Terpadu (PST)">
                      Pelayanan Statistik Terpadu (PST)
                    </Option>
                    <Option value="Kunjungan Dinas">Kunjungan Dinas</Option>
                    <Option value="Lainnya">Lainnya</Option>
                  </Select>
                  {dataPengunjung.pekerjaan === "Lainnya" && (
                    <div className="mt-2">
                      <Input
                        label="Isi Tujuan Kunjungan Anda (Jika memilih opsi lainnya)"
                        size="md"
                        crossOrigin={undefined}
                        name="other_identity"
                      />
                    </div>
                  )}
                  <Typography className="mb-2 mt-2" variant="h6">
                    Nama Lengkap Pengunjung
                  </Typography>
                  <Input
                    label="Nama Lengkap "
                    size="md"
                    crossOrigin={undefined}
                    name="nama"
                    value={dataPengunjung.nama}
                    onChange={handleInputChange}
                  />
                  <Typography className="mb-2 mt-2" variant="h6">
                    Nomor Telpon Pengunjung
                  </Typography>
                  <Input
                    label="Nomor Telpon Pengunjung"
                    size="md"
                    crossOrigin={undefined}
                    name="nomor_telp"
                    value={dataPengunjung.nomor_telp}
                    onChange={handleInputChange}
                  />
                  <Typography className="mb-2 mt-2" variant="h6">
                    Jenis Identitas Pengunjung
                  </Typography>
                  <Select
                    label="Pilih Jenis Identitas Pengunjung"
                    name="jenis_kelamin"
                    value={dataPengunjung.jenis_kelamin}
                    onChange={(e) =>
                      handleInputChange({
                        target: { name: "jenis_kelamin", value: e },
                      })
                    }
                  >
                    <Option value="NIK">NIK</Option>
                    <Option value="NIP">NIP</Option>
                    <Option value="Kartu Pelajar">Kartu Pelajar</Option>
                    <Option value="Lainnya">Lainnya</Option>
                  </Select>
                  {dataPengunjung.jenis_kelamin === "Lainnya" && (
                    <div className="mt-2">
                      <Input
                        label="Isi Jenis Identitas Anda (Jika memilih opsi lainnya)"
                        size="md"
                        crossOrigin={undefined}
                        name="other_identity"
                      />
                    </div>
                  )}

                  <Typography className="mb-2 mt-2" variant="h6">
                    Nomor Identitas Pengunjung
                  </Typography>
                  <Input
                    label="Nomor Identitas Pengunjung"
                    size="md"
                    crossOrigin={undefined}
                    name="instansi"
                    value={dataPengunjung.instansi}
                    onChange={handleInputChange}
                  />
                  {/* <Typography className="mb-2 mt-2" variant="h6">
                    Jenis Kelamin
                  </Typography>
                  <Select
                    label="Pilih Jenis Kelamin"
                    name="jenis_kelamin"
                    value={dataPengunjung.jenis_kelamin}
                    onChange={(e) =>
                      handleInputChange({
                        target: { name: "jenis_kelamin", value: e },
                      })
                    }
                  >
                    <Option value="laki-laki">Laki-Laki</Option>
                    <Option value="perempuan">Perempuan</Option>
                  </Select> */}
                  {/* <Typography className="mb-2 mt-2" variant="h6">
                    Pendidikan Tertinggi
                  </Typography>
                  <Select
                    label="Pilih Pendidikan Tertinggi"
                    name="pendidikan"
                    value={dataPengunjung.pendidikan}
                    onChange={(e) =>
                      handleInputChange({
                        target: { name: "pendidikan", value: e },
                      })
                    }
                  >
                    <Option value="≤ SLTA/Sederajat">
                      {"≤ SLTA/Sederajat"}
                    </Option>
                    <Option value="D4/S1">D4 / S1</Option>
                    <Option value="S2">S2</Option>
                    <Option value="S3">S3</Option>
                  </Select> */}
                  {/* <Typography className="mb-2 mt-2" variant="h6">
                    Pekerjaan Utama
                  </Typography>
                  <Select
                    label="Pilih Pekerjaan"
                    name="pekerjaan"
                    value={dataPengunjung.pekerjaan}
                    onChange={(e) =>
                      handleInputChange({
                        target: { name: "pekerjaan", value: e },
                      })
                    }
                  >
                    <Option value="Pelajar/Mahasiswa">Pelajar/Mahasiswa</Option>
                    <Option value="Peneliti/Dosen">Peneliti/Dosen</Option>
                    <Option value="ASN/TNI/Polri">ASN/TNI/Polri</Option>
                    <Option value="Pegawai BUMN/BUMD">Pegawai BUMN/BUMD</Option>
                    <Option value="Swasta">Swasta</Option>
                    <Option value="Lainnya">Lainnya</Option>
                  </Select> */}
                  <Typography className="mb-2 mt-2" variant="h6">
                    Asal Instansi/Perusahaan/Lembaga Pengunjung
                  </Typography>
                  <Input
                    label="Asal Instansi/Perusahaan/Lembaga Pengunjung"
                    size="md"
                    crossOrigin={undefined}
                    name="instansi"
                    value={dataPengunjung.instansi}
                    onChange={handleInputChange}
                  />
                  <Typography className="mb-2 mt-2" variant="h6">
                    Petugas Pelayanan
                  </Typography>
                  <Select
                    label="Pilih Petugas Pelayanan"
                    name="pendidikan"
                    value={dataPengunjung.pendidikan}
                    onChange={(e) =>
                      handleInputChange({
                        target: { name: "pendidikan", value: e },
                      })
                    }
                  >
                    <Option value="Chandra Sugiarso Lasambouw">Chandra Sugiarso Lasambouw</Option>
                    <Option value="Syaiful Anwar">Syaiful Anwar</Option>
                    <Option value="Hanifah Busainah">Hanifah Busainah</Option>
                    <Option value="Ika Dessyta Prihandani">Ika Dessyta Prihandani</Option>
                    <Option value="Robby Susiono">Robby Susiono</Option>
                    <Option value="Lainnya">Lainnya</Option>
                  </Select>

                  {dataPengunjung.pendidikan === "Lainnya" && (
                    <div className="mt-2">
                      <Input
                        label="Isi Petugas Pelayanan (Jika memilih opsi lainnya)"
                        size="md"
                        crossOrigin={undefined}
                        name="other_identity"
                      />
                    </div>
                  )}
                  {/* <Typography className="mb-2 mt-2" variant="h6">
                    Kategori Instansi/Lembaga
                  </Typography> */}
                  {/* <Select
                    label="Pilih Kategori Instansi/Lembaga"
                    name="kategori_instansi"
                    value={dataPengunjung.kategori_instansi}
                    onChange={(e) =>
                      handleInputChange({
                        target: { name: "kategori_instansi", value: e },
                      })
                    }
                  >
                    <Option value="Lembaga Negara">Lembaga Negara</Option>
                    <Option value="Kementrian & Lembaga Pemerintah">
                      Kementrian & Lembaga Pemerintah
                    </Option>
                    <Option value="TNI/Polri/BIN/Kejaksaan">
                      TNI/Polri/BIN/Kejaksaan
                    </Option>
                    <Option value="Pemerintah Daerah">Pemerintah Daerah</Option>
                    <Option value="Lembaga Internasional">
                      Lembaga Internasional
                    </Option>
                    <Option value="Lembaga Penelitian & Pendidikan">
                      Lembaga Penelitian & Pendidikan
                    </Option>
                    <Option value="BUMN/BUMD">BUMN/BUMD</Option>
                    <Option value="Swasta">Swasta</Option>
                    <Option value="Lainnya">Lainnya</Option>
                  </Select> */}
                  {/* <Typography className="mb-2 mt-2" variant="h6">
                    Pemanfaatan Utama Hasil Kunjungan Web
                  </Typography>
                  <Select
                    label="Pilih Tujuan"
                    name="hasil_kunjungan"
                    value={dataPengunjung.hasil_kunjungan}
                    onChange={(e) =>
                      handleInputChange({
                        target: { name: "hasil_kunjungan", value: e },
                      })
                    }
                  >
                    <Option value="Tugas Sekolah/Tugas Kuliah">
                      Tugas Sekolah/Tugas Kuliah
                    </Option>
                    <Option value="Pemerintahan">Pemerintahan</Option>
                    <Option value="Komersial">Komersial</Option>
                    <Option value="Penelitian">Penelitian</Option>
                    <Option value="Lainnya">Lainnya</Option>
                  </Select> */}
                  <div className="-ml-2.5 mt-3">
                    <Checkbox
                      label="Apakah data anda sudah benar?"
                      crossOrigin={undefined}
                      value={dataPengunjung.valid}
                      onChange={(e) => {
                        handleInputChange({
                          target: { name: "valid", value: e.target.checked },
                        });
                      }}
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
                  <Button
                    variant="gradient"
                    color="green"
                    onClick={(e) => saveData(e, dataPengunjung)}
                    type="submit"
                  >
                    <span>Simpan</span>
                  </Button>
                </DialogFooter>
              </form>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
