"use client";
import { useState } from "react";
import organizationService from "@/app/api/services/organizationService";
import { useDispatch } from "react-redux";
import { replaceOrganization } from "@/app/store/slices/organizationSlice";
import { Organization } from "@/app/types/User";
import { useRouter } from "next/navigation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { ShieldAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function UpdatePincodeForm({
  organization,
}: {
  organization: Organization;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");
  const [oldPincode, setOldPincode] = useState("");
  const [newPincode, setNewPincode] = useState("");
  const [pincodeConfirmation, setPincodeConfirmation] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  async function HandleUpdateOrg(e: any) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = {
        old_pincode: oldPincode,
        new_pincode: newPincode,
        pincode_confirmation: pincodeConfirmation,
      };
      const res: any = await organizationService.updatePincode(
        organization.unique_name,
        formData
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

  return (
    <form className="space-y-5 basic_card" onSubmit={HandleUpdateOrg}>
      {error !== "" && (
        <Alert variant="destructive">
          <ShieldAlert />
          <AlertTitle>Ogohlantirish</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {/* old pincode */}
      <div className="space-y-1">
        <label htmlFor="old_pincode" className="block">
          Eski pinkod*
        </label>
        <InputOTP
          maxLength={6}
          id="old_pincode"
          pattern={REGEXP_ONLY_DIGITS}
          value={oldPincode}
          onChange={(value) => setOldPincode(value)}
          required
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} className="border-gray-400" />
            <InputOTPSlot index={1} className="border-gray-400" />
            <InputOTPSlot index={2} className="border-gray-400" />
            <InputOTPSlot index={3} className="border-gray-400" />
            <InputOTPSlot index={4} className="border-gray-400" />
            <InputOTPSlot index={5} className="border-gray-400" />
          </InputOTPGroup>
        </InputOTP>
        <p className="text-sm text-gray-500">Faqat raqamlar</p>
      </div>

      <div className="w-full border-b border-gray-200"></div>

      {/* Banner */}
      <div className="space-y-1">
        <label htmlFor="new_pincode" className="block">
          Yangi pinkod*
        </label>
        <InputOTP
          maxLength={6}
          id="new_pincode"
          pattern={REGEXP_ONLY_DIGITS}
          value={newPincode}
          onChange={(value) => setNewPincode(value)}
          required
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} className="border-gray-400" />
            <InputOTPSlot index={1} className="border-gray-400" />
            <InputOTPSlot index={2} className="border-gray-400" />
            <InputOTPSlot index={3} className="border-gray-400" />
            <InputOTPSlot index={4} className="border-gray-400" />
            <InputOTPSlot index={5} className="border-gray-400" />
          </InputOTPGroup>
        </InputOTP>
        <p className="text-sm text-gray-500">Faqat raqamlar</p>
      </div>

      {/* logo */}
      <div className="space-y-1">
        <label htmlFor="pincode_contifmation" className="block">
          Pinkodni tasdiqlang*
        </label>
        <InputOTP
          maxLength={6}
          id="pincode_contifmation"
          pattern={REGEXP_ONLY_DIGITS}
          value={pincodeConfirmation}
          onChange={(value) => setPincodeConfirmation(value)}
          required
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} className="border-gray-400" />
            <InputOTPSlot index={1} className="border-gray-400" />
            <InputOTPSlot index={2} className="border-gray-400" />
            <InputOTPSlot index={3} className="border-gray-400" />
            <InputOTPSlot index={4} className="border-gray-400" />
            <InputOTPSlot index={5} className="border-gray-400" />
          </InputOTPGroup>
        </InputOTP>
        <p className="text-sm text-gray-500">Faqat raqamlar</p>
      </div>

      {/* submit */}
      <div>
        <button
          type="submit"
          className="bg-violet-600 text-white py-2 px-5 rounded-md hover:bg-violet-700 transition-colors cursor-pointer"
        >
          {isLoading ? "yangilanmoqda..." : "Pinkodni yangilash"}
        </button>
      </div>
    </form>
  );
}
