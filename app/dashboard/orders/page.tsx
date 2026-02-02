import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Package, Truck, CheckCircle, Clock, ShoppingCart } from "lucide-react"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/app/lib/prisma"
import { redirect } from "next/navigation"

export default async function OrdersPage() {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        redirect("/auth/login")
    }

    const userId = (session.user as any).id

    const orders = await prisma.order.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" }
    })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white">Mis Importaciones</h1>
                <Button asChild className="bg-blue-600 hover:bg-blue-500">
                    <Link href="/dashboard/requests">Nueva Solicitud</Link>
                </Button>
            </div>

            {orders.length === 0 ? (
                <Card className="bg-slate-900/50 border-slate-800 p-12 text-center">
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center text-slate-500">
                            <ShoppingCart className="w-8 h-8" />
                        </div>
                        <h2 className="text-xl font-bold text-white">No tienes pedidos activos</h2>
                        <p className="text-slate-400 max-w-sm mx-auto">
                            Tus importaciones aparecerán aquí una vez que aceptes una cotización y realices el pedido.
                        </p>
                        <Button asChild variant="outline" className="mt-4 border-blue-600 text-blue-500 hover:bg-blue-600 hover:text-white">
                            <Link href="/dashboard/requests">Solicitar Cotización</Link>
                        </Button>
                    </div>
                </Card>
            ) : (
                <div className="grid gap-4">
                    {orders.map((order) => {
                        // Safe parsing of order details if it's a string, assuming it might store product name or JSON
                        let productName = "Pedido #" + order.id.slice(-6);
                        try {
                            // If details is JSON
                            const detailsObj = JSON.parse(order.details);
                            if (detailsObj.productName) productName = detailsObj.productName;
                        } catch (e) {
                            productName = order.details || productName;
                        }

                        return (
                            <Link key={order.id} href={`/dashboard/orders/${order.id}`}>
                                <Card className="bg-slate-900/50 border-slate-800 hover:bg-slate-800/50 transition-colors cursor-pointer group">
                                    <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${order.status === 'DELIVERED' ? 'bg-green-500/10 text-green-500' :
                                                    order.status === 'IN_TRANSIT' ? 'bg-blue-500/10 text-blue-500' :
                                                        'bg-amber-500/10 text-amber-500'
                                                }`}>
                                                {order.status === 'DELIVERED' ? <CheckCircle className="w-6 h-6" /> :
                                                    order.status === 'IN_TRANSIT' ? <Truck className="w-6 h-6" /> :
                                                        <Package className="w-6 h-6" />}
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                                                    {productName}
                                                </h3>
                                                <p className="text-slate-400 text-sm">
                                                    {order.id} • Creado el {new Date(order.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-6">
                                            <div className="text-right hidden md:block">
                                                <p className="text-slate-400 text-xs uppercase">Valor Total</p>
                                                <p className="text-white font-mono font-bold">
                                                    ${Number(order.totalAmount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                                </p>
                                            </div>
                                            <Badge className={`px-3 py-1 ${order.status === 'DELIVERED' ? 'bg-green-500/20 text-green-400' :
                                                    order.status === 'IN_TRANSIT' ? 'bg-blue-500/20 text-blue-400' :
                                                        'bg-amber-500/20 text-amber-400'
                                                }`}>
                                                {order.status}
                                            </Badge>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
