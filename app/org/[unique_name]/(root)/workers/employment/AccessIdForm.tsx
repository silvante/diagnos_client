"use client";
import Heading from "@/app/(global_components)/Heading";
import { Organization } from "@/app/types/User";

export default function AccessIdForm({ org }: { org: Organization }) {
  return (
    <div className="p-5 bg-white border border-gray-300 rounded-2xl space-y-5">
      <Heading text="ID orqali" />
      <form>
        <div className="flex gap-4">
          <div className="rounded-lg flex-1 bg-white border border-slate-400 shadow-sm shadow-slate-100 focus:border-violet-600 transition-all flex">
            <label htmlFor="a_id" className="py-2 px-4">
              ID:
            </label>
            <input
              type="string"
              name="a_id"
              required
              placeholder="XXXXXXXX"
              maxLength={8}
              minLength={8}
              className="outline-none py-2 flex-1"
            />
          </div>
          <button
            type="submit"
            className="py-2 text-center px-8 rounded-lg bg-violet-600 text-white cursor-pointer"
          >
            Qidirish
          </button>
        </div>
      </form>
    </div>
  );
}
