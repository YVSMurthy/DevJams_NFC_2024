const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
    res.send("This is the default home page");
})

app.get('/getPieDataGender', (req, res) => {
    try {
        res.status(200).send({data: [57,34], ok: true})
    }
    catch {
        res.status(500).send({message: "Some internal error occured", ok: false})
    }
})

app.get('/getPieDataCustomerType', (req, res) => {
    try {
        res.status(200).send({data: [47,53], ok: true})
    }
    catch {
        res.status(500).send({message: "Some internal error occured", ok: false})
    }
})

app.get('/getSalesProductData', (req, res) => {
    const productData = [
            {"product_id": 1, "product_name": "Laptop", "product_price": 999.99, "product_cogs": 700, "product_quantity": 50, "product_type": "Electronics"},
            {"product_id": 2, "product_name": "Smartphone", "product_price": 699.99, "product_cogs": 450, "product_quantity": 100, "product_type": "Electronics"},
            {"product_id": 3, "product_name": "Tablet", "product_price": 399.99, "product_cogs": 250, "product_quantity": 75, "product_type": "Electronics"},
            {"product_id": 4, "product_name": "Wireless Headphones", "product_price": 199.99, "product_cogs": 120, "product_quantity": 150, "product_type": "Accessories"},
            {"product_id": 5, "product_name": "Bluetooth Speaker", "product_price": 149.99, "product_cogs": 90, "product_quantity": 120, "product_type": "Accessories"},
            {"product_id": 6, "product_name": "Smartwatch", "product_price": 249.99, "product_cogs": 150, "product_quantity": 80, "product_type": "Wearables"},
            {"product_id": 7, "product_name": "Gaming Console", "product_price": 499.99, "product_cogs": 350, "product_quantity": 60, "product_type": "Electronics"},
            {"product_id": 8, "product_name": "4K TV", "product_price": 899.99, "product_cogs": 600, "product_quantity": 40, "product_type": "Electronics"},
            {"product_id": 9, "product_name": "Laptop Stand", "product_price": 29.99, "product_cogs": 15, "product_quantity": 200, "product_type": "Accessories"},
            {"product_id": 10, "product_name": "External Hard Drive", "product_price": 99.99, "product_cogs": 60, "product_quantity": 90, "product_type": "Storage"},
            {"product_id": 11, "product_name": "Wireless Mouse", "product_price": 49.99, "product_cogs": 30, "product_quantity": 150, "product_type": "Accessories"},
            {"product_id": 12, "product_name": "Mechanical Keyboard", "product_price": 79.99, "product_cogs": 50, "product_quantity": 80, "product_type": "Accessories"},
            {"product_id": 13, "product_name": "Smart Home Hub", "product_price": 129.99, "product_cogs": 80, "product_quantity": 40, "product_type": "Smart Home"},
            {"product_id": 14, "product_name": "Action Camera", "product_price": 299.99, "product_cogs": 180, "product_quantity": 30, "product_type": "Electronics"},
            {"product_id": 15, "product_name": "Drone", "product_price": 499.99, "product_cogs": 350, "product_quantity": 25, "product_type": "Electronics"},
            {"product_id": 16, "product_name": "Portable Charger", "product_price": 39.99, "product_cogs": 20, "product_quantity": 100, "product_type": "Accessories"},
            {"product_id": 17, "product_name": "VR Headset", "product_price": 399.99, "product_cogs": 250, "product_quantity": 45, "product_type": "Wearables"},
            {"product_id": 18, "product_name": "Fitness Tracker", "product_price": 79.99, "product_cogs": 50, "product_quantity": 80, "product_type": "Wearables"},
            {"product_id": 19, "product_name": "Smart Bulb", "product_price": 19.99, "product_cogs": 10, "product_quantity": 200, "product_type": "Smart Home"},
            {"product_id": 20, "product_name": "Digital Camera", "product_price": 599.99, "product_cogs": 400, "product_quantity": 20, "product_type": "Electronics"},
            {"product_id": 21, "product_name": "Coffee Maker", "product_price": 89.99, "product_cogs": 50, "product_quantity": 60, "product_type": "Home Appliances"},
            {"product_id": 22, "product_name": "Blender", "product_price": 49.99, "product_cogs": 30, "product_quantity": 75, "product_type": "Home Appliances"},
            {"product_id": 23, "product_name": "Electric Kettle", "product_price": 39.99, "product_cogs": 20, "product_quantity": 100, "product_type": "Home Appliances"},
            {"product_id": 24, "product_name": "Air Fryer", "product_price": 129.99, "product_cogs": 80, "product_quantity": 50, "product_type": "Home Appliances"},
            {"product_id": 25, "product_name": "Rice Cooker", "product_price": 59.99, "product_cogs": 40, "product_quantity": 80, "product_type": "Home Appliances"},
            {"product_id": 26, "product_name": "Dishwasher", "product_price": 499.99, "product_cogs": 350, "product_quantity": 15, "product_type": "Home Appliances"},
            {"product_id": 27, "product_name": "Washing Machine", "product_price": 399.99, "product_cogs": 250, "product_quantity": 25, "product_type": "Home Appliances"},
            {"product_id": 28, "product_name": "Vacuum Cleaner", "product_price": 199.99, "product_cogs": 120, "product_quantity": 40, "product_type": "Home Appliances"},
            {"product_id": 29, "product_name": "Air Conditioner", "product_price": 799.99, "product_cogs": 550, "product_quantity": 20, "product_type": "Home Appliances"},
            {"product_id": 30, "product_name": "Refrigerator", "product_price": 899.99, "product_cogs": 600, "product_quantity": 15, "product_type": "Home Appliances"},
            {"product_id": 31, "product_name": "Bluetooth Keyboard", "product_price": 59.99, "product_cogs": 40, "product_quantity": 70, "product_type": "Accessories"},
            {"product_id": 32, "product_name": "USB-C Hub", "product_price": 29.99, "product_cogs": 15, "product_quantity": 150, "product_type": "Accessories"},
            {"product_id": 33, "product_name": "Surge Protector", "product_price": 19.99, "product_cogs": 10, "product_quantity": 200, "product_type": "Accessories"},
            {"product_id": 34, "product_name": "Gaming Mouse", "product_price": 59.99, "product_cogs": 40, "product_quantity": 90, "product_type": "Accessories"},
            {"product_id": 35, "product_name": "HDMI Cable", "product_price": 14.99, "product_cogs": 8, "product_quantity": 250, "product_type": "Accessories"},
            {"product_id": 36, "product_name": "Smart Thermostat", "product_price": 129.99, "product_cogs": 80, "product_quantity": 40, "product_type": "Smart Home"},
            {"product_id": 37, "product_name": "Home Security Camera", "product_price": 99.99, "product_cogs": 60, "product_quantity": 60, "product_type": "Smart Home"},
            {"product_id": 38, "product_name": "Smart Lock", "product_price": 149.99, "product_cogs": 90, "product_quantity": 30, "product_type": "Smart Home"},
            {"product_id": 39, "product_name": "Home Assistant", "product_price": 99.99, "product_cogs": 60, "product_quantity": 50, "product_type": "Smart Home"},
            {"product_id": 40, "product_name": "Digital Thermometer", "product_price": 29.99, "product_cogs": 15, "product_quantity": 120, "product_type": "Health"},
            {"product_id": 41, "product_name": "Electric Toothbrush", "product_price": 59.99, "product_cogs": 35, "product_quantity": 80, "product_type": "Health"},
            {"product_id": 42, "product_name": "Air Purifier", "product_price": 199.99, "product_cogs": 120, "product_quantity": 30, "product_type": "Health"},
            {"product_id": 43, "product_name": "Blood Pressure Monitor", "product_price": 79.99, "product_cogs": 50, "product_quantity": 70, "product_type": "Health"},
            {"product_id": 44, "product_name": "Fitness Scale", "product_price": 49.99, "product_cogs": 30, "product_quantity": 60, "product_type": "Health"},
            {"product_id": 45, "product_name": "Massage Gun", "product_price": 149.99, "product_cogs": 90, "product_quantity": 40, "product_type": "Health"},
            {"product_id": 46, "product_name": "Noise Cancelling Earbuds", "product_price": 199.99, "product_cogs": 130, "product_quantity": 50, "product_type": "Accessories"},
            {"product_id": 47, "product_name": "Gaming Headset", "product_price": 99.99, "product_cogs": 60, "product_quantity": 70, "product_type": "Accessories"},
            {"product_id": 48, "product_name": "Wireless Charging Pad", "product_price": 39.99, "product_cogs": 20, "product_quantity": 90, "product_type": "Accessories"},
            {"product_id": 49, "product_name": "Tablet Case", "product_price": 29.99, "product_cogs": 10, "product_quantity": 120, "product_type": "Accessories"},
            {"product_id": 50, "product_name": "Phone Stand", "product_price": 19.99, "product_cogs": 5, "product_quantity": 150, "product_type": "Accessories"},
                {"product_id": 51, "product_name": "Screen Protector", "product_price": 9.99, "product_cogs": 3, "product_quantity": 200, "product_type": "Accessories"},
                {"product_id": 52, "product_name": "Memory Card", "product_price": 29.99, "product_cogs": 15, "product_quantity": 100, "product_type": "Storage"},
                {"product_id": 53, "product_name": "Smart Doorbell", "product_price": 149.99, "product_cogs": 100, "product_quantity": 40, "product_type": "Smart Home"},
                {"product_id": 54, "product_name": "Streaming Device", "product_price": 59.99, "product_cogs": 40, "product_quantity": 80, "product_type": "Smart Home"},
                {"product_id": 55, "product_name": "Smart Light Strip", "product_price": 39.99, "product_cogs": 20, "product_quantity": 90, "product_type": "Smart Home"},
                {"product_id": 56, "product_name": "Robot Vacuum", "product_price": 299.99, "product_cogs": 200, "product_quantity": 30, "product_type": "Home Appliances"},
                {"product_id": 57, "product_name": "Cordless Drill", "product_price": 89.99, "product_cogs": 50, "product_quantity": 40, "product_type": "Tools"},
                {"product_id": 58, "product_name": "Smart Plug", "product_price": 24.99, "product_cogs": 10, "product_quantity": 150, "product_type": "Smart Home"},
                {"product_id": 59, "product_name": "Wi-Fi Range Extender", "product_price": 49.99, "product_cogs": 30, "product_quantity": 60, "product_type": "Electronics"},
                {"product_id": 60, "product_name": "Smart Speaker", "product_price": 129.99, "product_cogs": 80, "product_quantity": 50, "product_type": "Smart Home"},
                {"product_id": 61, "product_name": "Electric Shaver", "product_price": 79.99, "product_cogs": 50, "product_quantity": 70, "product_type": "Health"},
                {"product_id": 62, "product_name": "Hair Dryer", "product_price": 49.99, "product_cogs": 30, "product_quantity": 80, "product_type": "Health"},
                {"product_id": 63, "product_name": "Smart Mirror", "product_price": 299.99, "product_cogs": 180, "product_quantity": 20, "product_type": "Health"},
                {"product_id": 64, "product_name": "UV Sanitizer", "product_price": 59.99, "product_cogs": 30, "product_quantity": 90, "product_type": "Health"},
                {"product_id": 65, "product_name": "Electric Scooter", "product_price": 499.99, "product_cogs": 350, "product_quantity": 25, "product_type": "Transportation"},
                {"product_id": 66, "product_name": "E-Bike", "product_price": 1299.99, "product_cogs": 900, "product_quantity": 15, "product_type": "Transportation"},
                {"product_id": 67, "product_name": "Electric Skateboard", "product_price": 299.99, "product_cogs": 200, "product_quantity": 30, "product_type": "Transportation"},
                {"product_id": 68, "product_name": "Hoverboard", "product_price": 199.99, "product_cogs": 120, "product_quantity": 40, "product_type": "Transportation"},
                {"product_id": 69, "product_name": "Smart Helmet", "product_price": 99.99, "product_cogs": 60, "product_quantity": 50, "product_type": "Accessories"},
                {"product_id": 70, "product_name": "LED Desk Lamp", "product_price": 39.99, "product_cogs": 20, "product_quantity": 100, "product_type": "Home"},
                {"product_id": 71, "product_name": "Portable Projector", "product_price": 299.99, "product_cogs": 200, "product_quantity": 30, "product_type": "Home"},
                {"product_id": 72, "product_name": "Electric Blanket", "product_price": 79.99, "product_cogs": 50, "product_quantity": 60, "product_type": "Home"},
                {"product_id": 73, "product_name": "Heated Mattress Pad", "product_price": 99.99, "product_cogs": 70, "product_quantity": 40, "product_type": "Home"},
                {"product_id": 74, "product_name": "Humidifier", "product_price": 49.99, "product_cogs": 30, "product_quantity": 70, "product_type": "Health"},
                {"product_id": 75, "product_name": "Dehumidifier", "product_price": 149.99, "product_cogs": 100, "product_quantity": 30, "product_type": "Health"},
                {"product_id": 76, "product_name": "Water Filter", "product_price": 29.99, "product_cogs": 15, "product_quantity": 100, "product_type": "Home"},
                {"product_id": 77, "product_name": "Smartwatch Band", "product_price": 19.99, "product_cogs": 5, "product_quantity": 150, "product_type": "Accessories"},
                {"product_id": 78, "product_name": "Laptop Case", "product_price": 39.99, "product_cogs": 20, "product_quantity": 80, "product_type": "Accessories"},
                {"product_id": 79, "product_name": "Laptop Cooling Pad", "product_price": 29.99, "product_cogs": 15, "product_quantity": 90, "product_type": "Accessories"},
                {"product_id": 80, "product_name": "Portable Monitor", "product_price": 199.99, "product_cogs": 120, "product_quantity": 50, "product_type": "Electronics"},
                {"product_id": 81, "product_name": "Phone Charger", "product_price": 19.99, "product_cogs": 8, "product_quantity": 150, "product_type": "Accessories"},
                {"product_id": 82, "product_name": "Electric Bike Pump", "product_price": 49.99, "product_cogs": 30, "product_quantity": 60, "product_type": "Tools"},
                {"product_id": 83, "product_name": "Cordless Vacuum", "product_price": 199.99, "product_cogs": 120, "product_quantity": 40, "product_type": "Home Appliances"},
                {"product_id": 84, "product_name": "Portable Air Compressor", "product_price": 79.99, "product_cogs": 50, "product_quantity": 50, "product_type": "Tools"},
                {"product_id": 85, "product_name": "Car Dash Cam", "product_price": 99.99, "product_cogs": 60, "product_quantity": 70, "product_type": "Electronics"},
                {"product_id": 86, "product_name": "Car Jump Starter", "product_price": 149.99, "product_cogs": 100, "product_quantity": 40, "product_type": "Tools"},
                {"product_id": 87, "product_name": "Smart Car Charger", "product_price": 39.99, "product_cogs": 20, "product_quantity": 90, "product_type": "Accessories"},
                {"product_id": 88, "product_name": "Electric Lawn Mower", "product_price": 299.99, "product_cogs": 200, "product_quantity": 20, "product_type": "Tools"},
                {"product_id": 89, "product_name": "Leaf Blower", "product_price": 99.99, "product_cogs": 60, "product_quantity": 50, "product_type": "Tools"},
                {"product_id": 90, "product_name": "Garden Hose", "product_price": 29.99, "product_cogs": 15, "product_quantity": 100, "product_type": "Tools"},
                {"product_id": 91, "product_name": "BBQ Grill", "product_price": 199.99, "product_cogs": 120, "product_quantity": 30, "product_type": "Home"},
                {"product_id": 92, "product_name": "Patio Heater", "product_price": 299.99, "product_cogs": 180, "product_quantity": 20, "product_type": "Home"},
                {"product_id": 93, "product_name": "Outdoor Speaker", "product_price": 99.99, "product_cogs": 60, "product_quantity": 40, "product_type": "Electronics"},
                {"product_id": 94, "product_name": "Smart Thermostat", "product_price": 199.99, "product_cogs": 130, "product_quantity": 30, "product_type": "Smart Home"},
                {"product_id": 95, "product_name": "Smart Security Camera", "product_price": 149.99, "product_cogs": 100, "product_quantity": 40, "product_type": "Smart Home"},
                {"product_id": 96, "product_name": "Smart Lock", "product_price": 199.99, "product_cogs": 130, "product_quantity": 30, "product_type": "Smart Home"},
                {"product_id": 97, "product_name": "Smart Door Sensor", "product_price": 29.99, "product_cogs": 15, "product_quantity": 80, "product_type": "Smart Home"},
                {"product_id": 98, "product_name": "Smart Light Bulb", "product_price": 19.99, "product_cogs": 10, "product_quantity": 150, "product_type": "Smart Home"},
                {"product_id": 99, "product_name": "Video Doorbell", "product_price": 249.99, "product_cogs": 150, "product_quantity": 20, "product_type": "Smart Home"},
                {"product_id": 100, "product_name": "Surveillance Camera", "product_price": 99.99, "product_cogs": 60, "product_quantity": 50, "product_type": "Smart Home"},
                    {"product_id": 101, "product_name": "Smart Garage Door Opener", "product_price": 199.99, "product_cogs": 130, "product_quantity": 25, "product_type": "Smart Home"},
                    {"product_id": 102, "product_name": "Smart Curtain System", "product_price": 249.99, "product_cogs": 150, "product_quantity": 20, "product_type": "Smart Home"},
                    {"product_id": 103, "product_name": "Smart Light Switch", "product_price": 49.99, "product_cogs": 30, "product_quantity": 70, "product_type": "Smart Home"},
                    {"product_id": 104, "product_name": "Smart Air Purifier", "product_price": 199.99, "product_cogs": 130, "product_quantity": 30, "product_type": "Health"},
                    {"product_id": 105, "product_name": "Smart Coffee Maker", "product_price": 149.99, "product_cogs": 100, "product_quantity": 35, "product_type": "Kitchen"},
                    {"product_id": 106, "product_name": "Smart Kettle", "product_price": 99.99, "product_cogs": 60, "product_quantity": 40, "product_type": "Kitchen"},
                    {"product_id": 107, "product_name": "Smart Oven", "product_price": 499.99, "product_cogs": 350, "product_quantity": 15, "product_type": "Kitchen"},
                    {"product_id": 108, "product_name": "Smart Fridge", "product_price": 1999.99, "product_cogs": 1400, "product_quantity": 8, "product_type": "Kitchen"},
                    {"product_id": 109, "product_name": "Smart Dishwasher", "product_price": 999.99, "product_cogs": 700, "product_quantity": 10, "product_type": "Kitchen"},
                    {"product_id": 110, "product_name": "Smart Microwave", "product_price": 299.99, "product_cogs": 200, "product_quantity": 30, "product_type": "Kitchen"},
                    {"product_id": 111, "product_name": "Electric Pressure Cooker", "product_price": 149.99, "product_cogs": 100, "product_quantity": 45, "product_type": "Kitchen"},
                    {"product_id": 112, "product_name": "Sous Vide Cooker", "product_price": 99.99, "product_cogs": 60, "product_quantity": 50, "product_type": "Kitchen"},
                    {"product_id": 113, "product_name": "Food Dehydrator", "product_price": 199.99, "product_cogs": 130, "product_quantity": 30, "product_type": "Kitchen"},
                    {"product_id": 114, "product_name": "Blender", "product_price": 79.99, "product_cogs": 50, "product_quantity": 60, "product_type": "Kitchen"},
                    {"product_id": 115, "product_name": "Smart Scale", "product_price": 49.99, "product_cogs": 30, "product_quantity": 70, "product_type": "Health"},
                    {"product_id": 116, "product_name": "Smart Body Analyzer", "product_price": 99.99, "product_cogs": 60, "product_quantity": 40, "product_type": "Health"},
                    {"product_id": 117, "product_name": "Smart Sleep Tracker", "product_price": 199.99, "product_cogs": 130, "product_quantity": 25, "product_type": "Health"},
                    {"product_id": 118, "product_name": "Smart Pill Dispenser", "product_price": 149.99, "product_cogs": 100, "product_quantity": 35, "product_type": "Health"},
                    {"product_id": 119, "product_name": "Smart Thermometer", "product_price": 79.99, "product_cogs": 50, "product_quantity": 60, "product_type": "Health"},
                    {"product_id": 120, "product_name": "Smart Baby Monitor", "product_price": 149.99, "product_cogs": 100, "product_quantity": 35, "product_type": "Health"},
                    {"product_id": 121, "product_name": "Smart Baby Bottle Warmer", "product_price": 59.99, "product_cogs": 30, "product_quantity": 80, "product_type": "Health"},
                    {"product_id": 122, "product_name": "Smart Diaper Pail", "product_price": 99.99, "product_cogs": 60, "product_quantity": 50, "product_type": "Health"},
                    {"product_id": 123, "product_name": "Smart Car Seat", "product_price": 299.99, "product_cogs": 200, "product_quantity": 25, "product_type": "Health"},
                    {"product_id": 124, "product_name": "Smart Stroller", "product_price": 499.99, "product_cogs": 350, "product_quantity": 15, "product_type": "Health"},
                    {"product_id": 125, "product_name": "Fitness Tracker", "product_price": 99.99, "product_cogs": 60, "product_quantity": 80, "product_type": "Health"},
                    {"product_id": 126, "product_name": "Smart Jump Rope", "product_price": 29.99, "product_cogs": 15, "product_quantity": 120, "product_type": "Health"},
                    {"product_id": 127, "product_name": "Smart Dumbbells", "product_price": 199.99, "product_cogs": 130, "product_quantity": 30, "product_type": "Health"},
                    {"product_id": 128, "product_name": "Smart Yoga Mat", "product_price": 99.99, "product_cogs": 60, "product_quantity": 50, "product_type": "Health"},
                    {"product_id": 129, "product_name": "Smart Exercise Bike", "product_price": 699.99, "product_cogs": 500, "product_quantity": 10, "product_type": "Health"},
                    {"product_id": 130, "product_name": "Smart Treadmill", "product_price": 999.99, "product_cogs": 700, "product_quantity": 8, "product_type": "Health"},
                    {"product_id": 131, "product_name": "Smart Rowing Machine", "product_price": 799.99, "product_cogs": 550, "product_quantity": 12, "product_type": "Health"},
                    {"product_id": 132, "product_name": "Smart Punching Bag", "product_price": 299.99, "product_cogs": 200, "product_quantity": 25, "product_type": "Health"},
                    {"product_id": 133, "product_name": "VR Headset", "product_price": 399.99, "product_cogs": 250, "product_quantity": 20, "product_type": "Electronics"},
                    {"product_id": 134, "product_name": "Gaming Laptop", "product_price": 1499.99, "product_cogs": 1000, "product_quantity": 10, "product_type": "Electronics"},
                    {"product_id": 135, "product_name": "Gaming Mouse", "product_price": 79.99, "product_cogs": 50, "product_quantity": 60, "product_type": "Electronics"},
                    {"product_id": 136, "product_name": "Gaming Keyboard", "product_price": 99.99, "product_cogs": 60, "product_quantity": 50, "product_type": "Electronics"},
                    {"product_id": 137, "product_name": "Gaming Chair", "product_price": 299.99, "product_cogs": 200, "product_quantity": 25, "product_type": "Electronics"},
                    {"product_id": 138, "product_name": "Gaming Monitor", "product_price": 399.99, "product_cogs": 250, "product_quantity": 20, "product_type": "Electronics"},
                    {"product_id": 139, "product_name": "Mechanical Keyboard", "product_price": 149.99, "product_cogs": 100, "product_quantity": 30, "product_type": "Electronics"},
                    {"product_id": 140, "product_name": "Wireless Gaming Headset", "product_price": 199.99, "product_cogs": 130, "product_quantity": 30, "product_type": "Electronics"},
                    {"product_id": 141, "product_name": "4K TV", "product_price": 999.99, "product_cogs": 700, "product_quantity": 10, "product_type": "Electronics"},
                    {"product_id": 142, "product_name": "Soundbar", "product_price": 299.99, "product_cogs": 200, "product_quantity": 25, "product_type": "Electronics"},   
    ]

    const salesData = [
        {"sale_id": 1, "product_id": 1, "quantity_sold": 5, "sale_date": "2024-01-01", "sale_price": 999.99},
        {"sale_id": 2, "product_id": 2, "quantity_sold": 3, "sale_date": "2024-01-02", "sale_price": 599.99},
        {"sale_id": 3, "product_id": 3, "quantity_sold": 4, "sale_date": "2024-01-03", "sale_price": 299.99},
        {"sale_id": 4, "product_id": 4, "quantity_sold": 2, "sale_date": "2024-01-04", "sale_price": 199.99},
        {"sale_id": 5, "product_id": 5, "quantity_sold": 1, "sale_date": "2024-01-05", "sale_price": 499.99},
        {"sale_id": 6, "product_id": 6, "quantity_sold": 2, "sale_date": "2024-01-06", "sale_price": 399.99},
        {"sale_id": 7, "product_id": 7, "quantity_sold": 3, "sale_date": "2024-01-07", "sale_price": 299.99},
        {"sale_id": 8, "product_id": 8, "quantity_sold": 4, "sale_date": "2024-01-08", "sale_price": 199.99},
        {"sale_id": 9, "product_id": 9, "quantity_sold": 1, "sale_date": "2024-01-09", "sale_price": 99.99},
        {"sale_id": 10, "product_id": 10, "quantity_sold": 2, "sale_date": "2024-01-10", "sale_price": 599.99},
        {"sale_id": 11, "product_id": 11, "quantity_sold": 4, "sale_date": "2024-02-01", "sale_price": 399.99},
        {"sale_id": 12, "product_id": 12, "quantity_sold": 3, "sale_date": "2024-02-02", "sale_price": 299.99},
        {"sale_id": 13, "product_id": 13, "quantity_sold": 2, "sale_date": "2024-02-03", "sale_price": 199.99},
        {"sale_id": 14, "product_id": 14, "quantity_sold": 1, "sale_date": "2024-02-04", "sale_price": 99.99},
        {"sale_id": 15, "product_id": 15, "quantity_sold": 5, "sale_date": "2024-02-05", "sale_price": 499.99},
        {"sale_id": 16, "product_id": 16, "quantity_sold": 2, "sale_date": "2024-02-06", "sale_price": 399.99},
        {"sale_id": 17, "product_id": 17, "quantity_sold": 3, "sale_date": "2024-02-07", "sale_price": 299.99},
        {"sale_id": 18, "product_id": 18, "quantity_sold": 4, "sale_date": "2024-02-08", "sale_price": 199.99},
        {"sale_id": 19, "product_id": 19, "quantity_sold": 1, "sale_date": "2024-02-09", "sale_price": 99.99},
        {"sale_id": 20, "product_id": 20, "quantity_sold": 2, "sale_date": "2024-02-10", "sale_price": 599.99},
        {"sale_id": 21, "product_id": 21, "quantity_sold": 4, "sale_date": "2024-03-01", "sale_price": 399.99},
        {"sale_id": 22, "product_id": 22, "quantity_sold": 3, "sale_date": "2024-03-02", "sale_price": 299.99},
        {"sale_id": 23, "product_id": 23, "quantity_sold": 2, "sale_date": "2024-03-03", "sale_price": 199.99},
        {"sale_id": 24, "product_id": 24, "quantity_sold": 1, "sale_date": "2024-03-04", "sale_price": 99.99},
        {"sale_id": 25, "product_id": 25, "quantity_sold": 5, "sale_date": "2024-03-05", "sale_price": 499.99},
        {"sale_id": 26, "product_id": 26, "quantity_sold": 2, "sale_date": "2024-03-06", "sale_price": 399.99},
        {"sale_id": 27, "product_id": 27, "quantity_sold": 3, "sale_date": "2024-03-07", "sale_price": 299.99},
        {"sale_id": 28, "product_id": 28, "quantity_sold": 4, "sale_date": "2024-03-08", "sale_price": 199.99},
        {"sale_id": 29, "product_id": 29, "quantity_sold": 1, "sale_date": "2024-03-09", "sale_price": 99.99},
        {"sale_id": 30, "product_id": 30, "quantity_sold": 2, "sale_date": "2024-03-10", "sale_price": 599.99},
        {"sale_id": 31, "product_id": 31, "quantity_sold": 4, "sale_date": "2024-04-01", "sale_price": 399.99},
        {"sale_id": 32, "product_id": 32, "quantity_sold": 3, "sale_date": "2024-04-02", "sale_price": 299.99},
        {"sale_id": 33, "product_id": 33, "quantity_sold": 2, "sale_date": "2024-04-03", "sale_price": 199.99},
        {"sale_id": 34, "product_id": 34, "quantity_sold": 1, "sale_date": "2024-04-04", "sale_price": 99.99},
        {"sale_id": 35, "product_id": 35, "quantity_sold": 5, "sale_date": "2024-04-05", "sale_price": 499.99},
        {"sale_id": 36, "product_id": 36, "quantity_sold": 2, "sale_date": "2024-04-06", "sale_price": 399.99},
        {"sale_id": 37, "product_id": 37, "quantity_sold": 3, "sale_date": "2024-04-07", "sale_price": 299.99},
        {"sale_id": 38, "product_id": 38, "quantity_sold": 4, "sale_date": "2024-04-08", "sale_price": 199.99},
        {"sale_id": 39, "product_id": 39, "quantity_sold": 1, "sale_date": "2024-04-09", "sale_price": 99.99},
        {"sale_id": 40, "product_id": 40, "quantity_sold": 2, "sale_date": "2024-04-10", "sale_price": 599.99},
        {"sale_id": 41, "product_id": 41, "quantity_sold": 4, "sale_date": "2024-05-01", "sale_price": 399.99},
        {"sale_id": 42, "product_id": 42, "quantity_sold": 3, "sale_date": "2024-05-02", "sale_price": 299.99},
        {"sale_id": 43, "product_id": 43, "quantity_sold": 2, "sale_date": "2024-05-03", "sale_price": 199.99},
        {"sale_id": 44, "product_id": 44, "quantity_sold": 1, "sale_date": "2024-05-04", "sale_price": 99.99},
        {"sale_id": 45, "product_id": 45, "quantity_sold": 5, "sale_date": "2024-05-05", "sale_price": 499.99},
        {"sale_id": 46, "product_id": 46, "quantity_sold": 2, "sale_date": "2024-05-06", "sale_price": 399.99},
        {"sale_id": 47, "product_id": 47, "quantity_sold": 3, "sale_date": "2024-05-07", "sale_price": 299.99},
        {"sale_id": 48, "product_id": 48, "quantity_sold": 4, "sale_date": "2024-05-08", "sale_price": 199.99},
        {"sale_id": 49, "product_id": 49, "quantity_sold": 1, "sale_date": "2024-05-09", "sale_price": 99.99},
        {"sale_id": 50, "product_id": 50, "quantity_sold": 2, "sale_date": "2024-05-10", "sale_price": 599.99}
    ]
    
    
    try {
        res.status(200).send({productData: productData, salesData: salesData, ok: true})
    }
    catch {
        res.status(500).send({message: "Some internal error occured", ok: false})
    }
})

app.listen(3001);