import Image from "next/image";

export default function NotificationWorkers({item}) {
    return (
        <div
            className="flex items-center justify-between bg-gray-100 rounded-xl p-4"
        >
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                    {item.applicant.avatar ? (
                        <Image
                            src={item.applicant.avatar}
                            alt="avatar"
                            width={30}
                            height={30}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span className="text-sm font-semibold text-gray-600">
                            {item.applicant.name[0]}
                        </span>
                    )}
                </div>

                <div>
                    <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-800">
                            {item.applicant.name}
                        </p>

                        <span className="w-1 h-1 bg-violet-700 rounded-full"></span>

                        <span className="font-medium text-gray-700">
                            {item.role}
                        </span>
                    </div>

                    <p className="text-sm text-gray-500">
                        10 daqiqa oldin
                    </p>

                    <p className="text-xs text-gray-400">
                        {item.createdAt}
                    </p>
                </div>
            </div>

            <div className="flex gap-2">
                <button
                    className="px-3 py-1 text-sm rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition"
                >
                    Rad etish
                </button>

                <button
                    className="px-3 py-1 text-sm rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
                >
                    Ishga olish
                </button>
            </div>
        </div>
    )
}