import { useState } from "react";
import { Plus, Minus, ShoppingCart, Trash2, Menu, X } from "lucide-react";
import { Button } from "./components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
} from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./components/ui/dialog";
import { Separator } from "./components/ui/separator";

interface Food {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
}

interface OrderItem extends Food {
    quantity: number;
}

const FoodOrderingApp = () => {
    const [foods] = useState<Food[]>([
        {
            id: 1,
            name: "Nasi Goreng",
            price: 25000,
            image: "https://cdn1-production-images-kly.akamaized.net/EjwV7j3Y4JrlqUFuavke4NtRWtM=/1200x675/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/3108566/original/079979700_1587487794-Sajiku_1.jpg",
            description: "Nasi goreng spesial dengan telur dan ayam",
        },
        {
            id: 2,
            name: "Mie Ayam",
            price: 20000,
            image: "https://nibble-images.b-cdn.net/nibble/original_images/asal_usul_mie_ayam_01_0ace759bee.jpg",
            description: "Mie ayam dengan pangsit dan bakso",
        },
        {
            id: 3,
            name: "Gado-Gado",
            price: 18000,
            image: "https://www.masakapahariini.com/wp-content/uploads/2019/01/gado-gado-MAHI.jpg",
            description: "Sayuran segar dengan bumbu kacang",
        },
        {
            id: 4,
            name: "Rendang",
            price: 35000,
            image: "https://www.dapurkobe.co.id/wp-content/uploads/rendang-daging.jpg",
            description: "Rendang daging sapi asli Padang",
        },
        {
            id: 5,
            name: "Soto Ayam",
            price: 22000,
            image: "https://sogood.id/wp-content/uploads/2018/08/Resep-Soto-Ayam-Goreng-Madura.jpg",
            description: "Soto ayam kuning dengan nasi",
        },
        {
            id: 6,
            name: "Bakso",
            price: 15000,
            image: "https://awsimages.detik.net.id/community/media/visual/2019/08/12/dca21bf3-923c-486f-bc2e-a3dcd759b1df_43.jpeg?w=600&q=90",
            description: "Bakso daging sapi dengan mie",
        },
        {
            id: 7,
            name: "Ayam Geprek",
            price: 28000,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_opGI0TNbD-g_vdCkx_XCl0cjI_34kDMvwQ&s",
            description: "Ayam crispy dengan sambal geprek",
        },
        {
            id: 8,
            name: "Kebab Turki",
            price: 8000,
            image: "https://www.dapurkobe.co.id/wp-content/uploads/kebab-sosis.jpg",
            description: "Kebab Turki Maknyusss",
        },
    ]);

    const [orders, setOrders] = useState<OrderItem[]>([]);
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const addToOrder = (food: Food) => {
        setOrders((prevOrders) => {
            const existingOrder = prevOrders.find(
                (order) => order.id === food.id
            );
            if (existingOrder) {
                return prevOrders.map((order) =>
                    order.id === food.id
                        ? { ...order, quantity: order.quantity + 1 }
                        : order
                );
            } else {
                return [...prevOrders, { ...food, quantity: 1 }];
            }
        });
    };

    const decreaseQuantity = (foodId: number) => {
        setOrders((prevOrders) => {
            return prevOrders
                .map((order) => {
                    if (order.id === foodId) {
                        if (order.quantity > 1) {
                            return { ...order, quantity: order.quantity - 1 };
                        }
                        return null;
                    }
                    return order;
                })
                .filter(Boolean) as OrderItem[];
        });
    };

    const increaseQuantity = (foodId: number) => {
        setOrders((prevOrders) => {
            return prevOrders.map((order) =>
                order.id === foodId
                    ? { ...order, quantity: order.quantity + 1 }
                    : order
            );
        });
    };

    const removeFromOrder = (foodId: number) => {
        setOrders((prevOrders) =>
            prevOrders.filter((order) => order.id !== foodId)
        );
    };

    const getTotalPrice = () => {
        return orders.reduce(
            (total, order) => total + order.price * order.quantity,
            0
        );
    };

    const getTotalItems = () => {
        return orders.reduce((total, order) => total + order.quantity, 0);
    };

    const processOrder = () => {
        if (orders.length > 0) {
            alert(
                `Pesanan berhasil diproses! Total: Rp ${getTotalPrice().toLocaleString(
                    "id-ID"
                )}`
            );
            setOrders([]);
            setShowOrderModal(false);
        }
    };

    const formatPrice = (price: number) => {
        return `Rp ${price.toLocaleString("id-ID")}`;
    };

    return (
        <div className='min-h-screen bg-gradient-to-b from-gray-50 to-gray-100'>
            <header className='bg-white shadow-md border-b sticky top-0 z-10'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='flex justify-between items-center h-16'>
                        <h1 className='text-2xl font-bold text-gray-900 flex items-center'>
                            <span className='text-orange-500 mr-2'>🍽️</span>
                            <span className='bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent'>
                                Food Order
                            </span>
                        </h1>

                        <div className='hidden md:flex items-center space-x-4'>
                            <Dialog
                                open={showOrderModal}
                                onOpenChange={setShowOrderModal}
                            >
                                <DialogTrigger asChild>
                                    <Button
                                        className='relative group overflow-hidden'
                                        variant='default'
                                        size='sm'
                                        style={{
                                            background:
                                                "linear-gradient(to right, #f97316, #f59e0b)",
                                        }}
                                    >
                                        <div className='absolute inset-0 w-full h-full bg-gradient-to-r from-orange-600 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity'></div>
                                        <ShoppingCart className='mr-2 h-4 w-4 relative z-10' />
                                        <span className='relative z-10'>
                                            Keranjang
                                        </span>
                                        {getTotalItems() > 0 && (
                                            <Badge className=' bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center shadow-md'>
                                                {getTotalItems()}
                                            </Badge>
                                        )}
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className='sm:max-w-2xl max-h-[80vh] flex flex-col rounded-xl'>
                                    <DialogHeader className='pb-2'>
                                        <DialogTitle className='text-2xl font-bold text-gray-800 flex items-center'>
                                            <ShoppingCart className='mr-2 h-5 w-5 text-orange-500' />
                                            Keranjang Pesanan
                                        </DialogTitle>
                                    </DialogHeader>
                                    <Separator className='my-2' />
                                    <div className='flex-1 overflow-y-auto'>
                                        {orders.length === 0 ? (
                                            <div className='text-center py-12'>
                                                <ShoppingCart
                                                    size={80}
                                                    className='mx-auto text-gray-300 mb-6'
                                                />
                                                <p className='text-gray-500 text-xl font-medium mb-2'>
                                                    Keranjang Anda masih kosong
                                                </p>
                                                <p className='text-gray-400 mb-6'>
                                                    Tambahkan makanan untuk
                                                    mulai memesan
                                                </p>
                                                <Button
                                                    variant='outline'
                                                    onClick={() =>
                                                        setShowOrderModal(false)
                                                    }
                                                    className='border-orange-500 text-orange-500 hover:bg-orange-50'
                                                >
                                                    Jelajahi Menu
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className='space-y-4 py-2'>
                                                {orders.map((order) => (
                                                    <div
                                                        key={order.id}
                                                        className='flex items-center justify-between p-4 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-all'
                                                    >
                                                        <div className='flex items-center gap-4'>
                                                            <img
                                                                src={
                                                                    order.image
                                                                }
                                                                alt={order.name}
                                                                className='rounded-lg object-cover h-24 w-24 shadow-sm'
                                                            />
                                                            <div className='flex flex-col'>
                                                                <h3 className='font-semibold text-gray-900 text-lg'>
                                                                    {order.name}
                                                                </h3>
                                                                <p className='text-gray-600 text-sm'>
                                                                    {formatPrice(
                                                                        order.price
                                                                    )}{" "}
                                                                    x{" "}
                                                                    {
                                                                        order.quantity
                                                                    }
                                                                </p>
                                                                <div className='flex items-center gap-3 mt-2'>
                                                                    <div className='flex items-center gap-2 bg-gray-50 rounded-full p-1'>
                                                                        <Button
                                                                            variant='outline'
                                                                            size='icon'
                                                                            onClick={() =>
                                                                                decreaseQuantity(
                                                                                    order.id
                                                                                )
                                                                            }
                                                                            className='rounded-full h-8 w-8 border-gray-200'
                                                                        >
                                                                            <Minus className='h-3 w-3' />
                                                                        </Button>
                                                                        <span className='font-semibold min-w-[24px] text-center'>
                                                                            {
                                                                                order.quantity
                                                                            }
                                                                        </span>
                                                                        <Button
                                                                            variant='default'
                                                                            size='icon'
                                                                            onClick={() =>
                                                                                increaseQuantity(
                                                                                    order.id
                                                                                )
                                                                            }
                                                                            className='rounded-full h-8 w-8 bg-orange-500 hover:bg-orange-600'
                                                                        >
                                                                            <Plus className='h-3 w-3' />
                                                                        </Button>
                                                                    </div>
                                                                    <Button
                                                                        variant='ghost'
                                                                        size='icon'
                                                                        onClick={() =>
                                                                            removeFromOrder(
                                                                                order.id
                                                                            )
                                                                        }
                                                                        className='rounded-full h-8 w-8 hover:bg-red-50'
                                                                    >
                                                                        <Trash2 className='h-4 w-4 text-red-500' />
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='text-right'>
                                                            <span className='font-bold text-orange-500 text-lg'>
                                                                {formatPrice(
                                                                    order.price *
                                                                        order.quantity
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    {orders.length > 0 && (
                                        <>
                                            <Separator className='my-4' />
                                            <div className='space-y-4'>
                                                <div className='flex items-center justify-between bg-orange-50 p-4 rounded-lg'>
                                                    <span className='text-xl font-semibold text-gray-900'>
                                                        Total Pesanan:
                                                    </span>
                                                    <span className='text-2xl font-bold text-orange-500'>
                                                        {formatPrice(
                                                            getTotalPrice()
                                                        )}
                                                    </span>
                                                </div>
                                                <div className='flex gap-3'>
                                                    <Button
                                                        variant='outline'
                                                        className='flex-1 border-gray-300'
                                                        onClick={() =>
                                                            setShowOrderModal(
                                                                false
                                                            )
                                                        }
                                                    >
                                                        Lanjut Belanja
                                                    </Button>
                                                    <Button
                                                        variant='default'
                                                        className='flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-md'
                                                        onClick={processOrder}
                                                    >
                                                        Pesan Sekarang
                                                    </Button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </DialogContent>
                            </Dialog>
                        </div>
                        <div className='md:hidden'>
                            <Button
                                variant='ghost'
                                size='icon'
                                onClick={() =>
                                    setMobileMenuOpen(!mobileMenuOpen)
                                }
                            >
                                {mobileMenuOpen ? (
                                    <X className='h-6 w-6' />
                                ) : (
                                    <Menu className='h-6 w-6' />
                                )}
                            </Button>
                        </div>
                    </div>
                    {mobileMenuOpen && (
                        <div className='md:hidden py-4 border-t border-gray-200'>
                            <Dialog
                                open={showOrderModal}
                                onOpenChange={setShowOrderModal}
                            >
                                <DialogTrigger asChild>
                                    <Button
                                        className='w-full justify-between'
                                        variant='default'
                                        style={{
                                            background:
                                                "linear-gradient(to right, #f97316, #f59e0b)",
                                        }}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <div className='flex items-center'>
                                            <ShoppingCart className='mr-2 h-4 w-4' />
                                            <span>Keranjang</span>
                                        </div>
                                        {getTotalItems() > 0 && (
                                            <Badge className='bg-white text-orange-500 ml-2'>
                                                {getTotalItems()}
                                            </Badge>
                                        )}
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className='sm:max-w-2xl max-h-[90vh] flex flex-col'>
                                    <div className='flex-1 overflow-y-auto'>
                                        {orders.length === 0 ? (
                                            <div className='text-center py-12'>
                                                <ShoppingCart
                                                    size={80}
                                                    className='mx-auto text-gray-300 mb-6'
                                                />
                                                <p className='text-gray-500 text-xl font-medium mb-2'>
                                                    Keranjang Anda masih kosong
                                                </p>
                                                <p className='text-gray-400 mb-6'>
                                                    Tambahkan makanan untuk
                                                    mulai memesan
                                                </p>
                                                <Button
                                                    variant='outline'
                                                    onClick={() =>
                                                        setShowOrderModal(false)
                                                    }
                                                    className='border-orange-500 text-orange-500 hover:bg-orange-50'
                                                >
                                                    Jelajahi Menu
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className='space-y-4 py-2'>
                                                {orders.map((order) => (
                                                    <div
                                                        key={order.id}
                                                        className='flex items-center justify-between p-4 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-all'
                                                    >
                                                        <div className='flex items-center gap-4'>
                                                            <img
                                                                src={
                                                                    order.image
                                                                }
                                                                alt={order.name}
                                                                className='rounded-lg object-cover h-24 w-24 shadow-sm'
                                                            />
                                                            <div className='flex flex-col'>
                                                                <h3 className='font-semibold text-gray-900 text-lg'>
                                                                    {order.name}
                                                                </h3>
                                                                <p className='text-gray-600 text-sm'>
                                                                    {formatPrice(
                                                                        order.price
                                                                    )}{" "}
                                                                    x{" "}
                                                                    {
                                                                        order.quantity
                                                                    }
                                                                </p>
                                                                <div className='flex items-center gap-3 mt-2'>
                                                                    <div className='flex items-center gap-2 bg-gray-50 rounded-full p-1'>
                                                                        <Button
                                                                            variant='outline'
                                                                            size='icon'
                                                                            onClick={() =>
                                                                                decreaseQuantity(
                                                                                    order.id
                                                                                )
                                                                            }
                                                                            className='rounded-full h-8 w-8 border-gray-200'
                                                                        >
                                                                            <Minus className='h-3 w-3' />
                                                                        </Button>
                                                                        <span className='font-semibold min-w-[24px] text-center'>
                                                                            {
                                                                                order.quantity
                                                                            }
                                                                        </span>
                                                                        <Button
                                                                            variant='default'
                                                                            size='icon'
                                                                            onClick={() =>
                                                                                increaseQuantity(
                                                                                    order.id
                                                                                )
                                                                            }
                                                                            className='rounded-full h-8 w-8 bg-orange-500 hover:bg-orange-600'
                                                                        >
                                                                            <Plus className='h-3 w-3' />
                                                                        </Button>
                                                                    </div>
                                                                    <Button
                                                                        variant='ghost'
                                                                        size='icon'
                                                                        onClick={() =>
                                                                            removeFromOrder(
                                                                                order.id
                                                                            )
                                                                        }
                                                                        className='rounded-full h-8 w-8 hover:bg-red-50'
                                                                    >
                                                                        <Trash2 className='h-4 w-4 text-red-500' />
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='text-right'>
                                                            <span className='font-bold text-orange-500 text-lg'>
                                                                {formatPrice(
                                                                    order.price *
                                                                        order.quantity
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    {orders.length > 0 && (
                                        <>
                                            <Separator className='my-4' />
                                            <div className='space-y-4'>
                                                <div className='flex items-center justify-between bg-orange-50 p-4 rounded-lg'>
                                                    <span className='text-xl font-semibold text-gray-900'>
                                                        Total Pesanan:
                                                    </span>
                                                    <span className='text-2xl font-bold text-orange-500'>
                                                        {formatPrice(
                                                            getTotalPrice()
                                                        )}
                                                    </span>
                                                </div>
                                                <div className='flex gap-3'>
                                                    <Button
                                                        variant='outline'
                                                        className='flex-1 border-gray-300'
                                                        onClick={() =>
                                                            setShowOrderModal(
                                                                false
                                                            )
                                                        }
                                                    >
                                                        Lanjut Belanja
                                                    </Button>
                                                    <Button
                                                        variant='default'
                                                        className='flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-md'
                                                        onClick={processOrder}
                                                    >
                                                        Pesan Sekarang
                                                    </Button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </DialogContent>
                            </Dialog>
                        </div>
                    )}
                </div>
            </header>

            <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                <div className='mb-10 text-center'>
                    <h2 className='text-4xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text  inline-block'>
                        Menu Makanan
                    </h2>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                    {foods.map((food) => {
                        const orderItem = orders.find(
                            (order) => order.id === food.id
                        );
                        return (
                            <Card
                                key={food.id}
                                className='overflow-hidden hover:shadow-xl transition-all duration-300 border-0 rounded-xl shadow-md group pt-0 '
                            >
                                <div className='relative h-48 overflow-hidden'>
                                    <img
                                        src={food.image}
                                        alt={food.name}
                                        className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300'
                                    />
                                    <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity'></div>
                                </div>
                                <CardHeader>
                                    <CardTitle className='text-xl'>
                                        {food.name}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className=' h-10'>
                                    <p className='text-gray-600 text-sm'>
                                        {food.description}
                                    </p>
                                </CardContent>
                                <CardFooter className='flex items-center justify-between pt-2 border-t border-gray-100'>
                                    <span className='text-lg font-bold text-orange-500'>
                                        {formatPrice(food.price)}
                                    </span>
                                    {orderItem ? (
                                        <div className='flex items-center gap-2 bg-gray-50 rounded-full p-1'>
                                            <Button
                                                variant='outline'
                                                size='icon'
                                                onClick={() =>
                                                    decreaseQuantity(food.id)
                                                }
                                                className='rounded-full h-8 w-8 border-gray-200'
                                            >
                                                <Minus className='h-3 w-3' />
                                            </Button>
                                            <span className='font-semibold min-w-[24px] text-center'>
                                                {orderItem.quantity}
                                            </span>
                                            <Button
                                                variant='default'
                                                size='icon'
                                                onClick={() =>
                                                    increaseQuantity(food.id)
                                                }
                                                className='rounded-full h-8 w-8 bg-orange-500 hover:bg-orange-600'
                                            >
                                                <Plus className='h-3 w-3' />
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button
                                            variant='default'
                                            size='sm'
                                            onClick={() => addToOrder(food)}
                                            className='gap-2 rounded-full px-4 bg-orange-500 hover:bg-orange-600'
                                        >
                                            <Plus className='h-4 w-4' />
                                            Tambah
                                        </Button>
                                    )}
                                </CardFooter>
                            </Card>
                        );
                    })}
                </div>
            </main>
        </div>
    );
};

export default FoodOrderingApp;
