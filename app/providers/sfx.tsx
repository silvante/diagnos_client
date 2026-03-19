"use client"

import { LoadSfx } from "@/lib/sfx"
import { useEffect } from "react"

export default function SFX() {
    useEffect(() => {
        LoadSfx()
    }, [])

    return null
}