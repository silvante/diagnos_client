"use client";
import { FileImage, ShieldAlert } from "lucide-react";
import { useState } from "react";
import organizationService from "@/app/api/services/organizationService";
import { useDispatch } from "react-redux";
import { replaceOrganization } from "@/app/store/slices/organizationSlice";
import { BannerData, Organization } from "@/app/types/User";
import { useRouter } from "next/navigation";
import Spinner from "@/app/(global_components)/Spinner";
import uploadService from "@/app/api/services/uploadsService";
import { origins } from "@/app/global/data";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

export default function UpdatezrganisationForm({
  organization,
}: {
  organization: Organization;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  // form data
  const [description, setDescription] = useState(organization.description);
  const [name, setName] = useState(organization.name);
  const [origin, setOrigin] = useState(organization.origin);

  // upload data
  const [logoBase64, setLogoBase64] = useState<string | null>(
    organization.logo
  );
  const [bannerBase64, setBannerBase64] = useState<string | null>(
    organization.banner ? organization.banner.original : null
  );

  const [logo, setlogo] = useState<File | null>(null);
  const [banner, setbanner] = useState<File | null>(null);

  // converter
  function ConvertImageToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function HandleChangeBanner(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setbanner(file);
      const base64 = await ConvertImageToBase64(file);
      setBannerBase64(base64);
    }
  }

  async function HandleChangeLogo(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setlogo(file);
      const base64 = await ConvertImageToBase64(file);
      setLogoBase64(base64);
    }
  }

  async function HandleUpdateOrg(e: any) {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Prepare data for organization creation
      let bannerData: BannerData | undefined = undefined;
      let logoData: string | undefined = undefined;

      // upload banner if we have it
      if (banner) {
        const BannerformData = new FormData();
        BannerformData.append("file", banner);
        try {
          const res: any = await uploadService.uploadBanner(BannerformData);
          const new_banner: BannerData = res;
          bannerData = new_banner;
        } catch (error) {
          setError("banner yuklashda xato");
          setIsLoading(false);
          return;
        }
      }

      // upload logo if it is present
      if (logo) {
        const LogoformData = new FormData();
        LogoformData.append("file", logo);
        try {
          const res: any = await uploadService.uploadLogo(LogoformData);
          logoData = String(res);
        } catch (error) {
          setError("logotip yuklashda xato");
          setIsLoading(false);
          return;
        }
      }

      // Build the createData object
      const createData: any = {
        name,
        description,
        origin,
        ...(bannerData && { banner: bannerData }),
        ...(logoData && { logo: logoData }),
      };

      const res: any = await organizationService.update(
        organization.unique_name,
        createData
      );
      const res_organization: Organization = res;
      dispatch(replaceOrganization(res_organization));
      router.push("/panel/organizations");
      setIsLoading(false);
    } catch (error: any) {
      if (!error.response) {
        setError("Barcha maydonlarni to'g'ri to'ldirganingizga ishonch hosil qiling!");
      } else {
        setError(error.response.data.message);
      }
      setIsLoading(false);
    }
  }

  // // clear banner data
  // function ClearBannerData(e: any) {
  //   e.preventDefault();
  //   setBannerBase64(null);
  //   setbanner(null);
  // }

  // // clear logo data
  // function ClearLogoData(e: any) {
  //   e.preventDefault();
  //   setLogoBase64(null);
  //   setlogo(null);
  // }

  return (
    <form className="space-y-5 basic_card" onSubmit={HandleUpdateOrg}>
      {error !== "" && (
        <Alert variant="destructive">
          <ShieldAlert />
          <AlertTitle>Ogohlantirish</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {/* name */}
      <div className="space-y-1">
        <label htmlFor="name" className="block">
          Tashkilot nomi*
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="global_input w-full"
          placeholder="Tashkilot nomini kiriting"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={100}
          required
        />
      </div>

      {/* desctiprion */}
      <div className="space-y-1">
        <label htmlFor="description" className="block">
          Tashkilot tavsifi*
        </label>
        <textarea
          rows={3}
          maxLength={500}
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="global_input w-full resize-none"
          placeholder="Tashkilot tavsifini kiriting"
          required
        />
        <p className="text-sm text-gray-500">Maksimal 500 belgi</p>
      </div>

      {/* Banner */}
      <div className="space-y-1">
        <label
          htmlFor="banner"
          className="flex items-center justify-center overflow-hidden bg-gray-100 border border-gray-500 border-dashed rounded-md cursor-pointer hover:bg-gray-200 transition-colors w-full h-64"
        >
          {!bannerBase64 ? (
            <div className="flex flex-col items-center gap-2 text-gray-700">
              <FileImage />
              Banner rasmini yuklash (ixtiyoriy)
            </div>
          ) : (
            <div className="w-full h-full relative">
              {/* <button
                type="button"
                className="bg-white p-2 rounded-full text-black hover:text-violet-600 transition-all absolute top-5 right-5"
                onClick={ClearBannerData}
              >
                <Trash2 />
              </button> */}
              <img
                src={bannerBase64}
                alt="Sizning banneringiz"
                className="object-cover w-full h-full"
              />
            </div>
          )}
        </label>
        <input
          type="file"
          name="banner"
          id="banner"
          className="hidden"
          onChange={HandleChangeBanner}
        />
      </div>

      {/* logo */}
      <div className="space-y-1">
        <label
          htmlFor="logo"
          className="flex items-center justify-center bg-gray-100 border border-gray-500 border-dashed rounded-md cursor-pointer hover:bg-gray-200 transition-colors w-80 h-40"
        >
          {!logoBase64 ? (
            <div className="flex flex-col items-center gap-2 text-gray-700">
              <FileImage />
              Logotip rasmini yuklash (ixtiyoriy)
            </div>
          ) : (
            <img
              src={logoBase64}
              alt="sizning logotipingiz"
              className="w-full max-h-full object-cover"
            />
          )}
        </label>
        {/* {logoBase64 && (
          <button
            type="button"
            className="mt-3 py-2 px-4 rounded-full hover:text-violet-600 border border-gray-400 bg-white flex gap-1 items-center transition-all cursor-pointer"
            onClick={ClearLogoData}
          >
            <Trash2 /> Delete Logo
          </button>
        )} */}
        <input
          type="file"
          name="logo"
          id="logo"
          className="hidden"
          onChange={HandleChangeLogo}
        />
      </div>

      {/* origin */}
      <div className="space-y-1">
        <label htmlFor="origin" className="block">
          Manzil*
        </label>
        <select
          id="origin"
          name="origin"
          className="global_input w-full none text-black"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          required
        >
          {origins.map((origin) => {
            return (
              <option key={origin.id} value={origin.name} className="text-black">
                {origin.name}
              </option>
            );
          })}
        </select>
      </div>

      {/* submit */}
      <div>
        <button
          type="submit"
          className="bg-violet-600 text-white py-2 px-5 rounded-md hover:bg-violet-700 transition-colors cursor-pointer"
        >
          {isLoading ? "yangilanmoqda..." : "Tashkilotni yangilash"}
        </button>
      </div>
    </form>
  );
}
