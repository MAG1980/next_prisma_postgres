"use client"

import dynamic from "next/dynamic"
const App = dynamic(() => import("@/admin/App"), { ssr: false })

export default function AdminPage() {
    return <App/>;
};