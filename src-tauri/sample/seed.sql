INSERT INTO equipment (id, service_tag, name, description) VALUES
-- Computers
(LOWER(HEX(RANDOMBLOB(16))), '123456', 'Dell OptiPlex 7090', 
'Brand: Dell  
Model: OptiPlex 7090  
Processor: Intel Core i7-11700 @ 2.50GHz  
RAM: 16GB DDR4  
Storage: 512GB NVMe SSD  
Operating System: Windows 11 Pro  
IP Address: 192.168.1.101  
MAC Address: 00:1A:2B:3C:4D:5E  
Additional Info: Pre-installed with Microsoft Office 2021 and security software.'),

(LOWER(HEX(RANDOMBLOB(16))), '654321', 'HP EliteDesk 800 G6', 
'Brand: HP  
Model: EliteDesk 800 G6  
Processor: AMD Ryzen 7 5800X @ 3.80GHz  
RAM: 32GB DDR4  
Storage: 1TB NVMe SSD  
Operating System: Ubuntu 22.04 LTS  
IP Address: 192.168.1.102  
MAC Address: 00:1B:2C:3D:4E:5F  
Additional Info: Dual monitor support with dedicated NVIDIA GTX 1660 graphics card.'
),

(LOWER(HEX(RANDOMBLOB(16))), '789012', 'Lenovo ThinkCentre M90q Gen 2', 
'Brand: Lenovo  
Model: ThinkCentre M90q Gen 2  
Processor: Intel Core i5-11400T @ 2.00GHz  
RAM: 8GB DDR4  
Storage: 256GB SSD  
Operating System: Windows 10 Pro  
IP Address: 192.168.1.103  
MAC Address: 00:1C:2D:3E:4F:5G  
Additional Info: Small form factor, energy-efficient desktop optimized for office use.'
),

-- Printers
(LOWER(HEX(RANDOMBLOB(16))), '234567', 'HP LaserJet Pro M404dn', 
'Brand: HP  
Model: LaserJet Pro M404dn  
Type: Monochrome Laser Printer  
Resolution: 1200 x 1200 dpi  
Speed: 40 ppm  
Network: Ethernet, USB 2.0  
IP Address: 192.168.1.201  
MAC Address: 00:2A:3B:4C:5D:6E  
Additional Info: Duplex printing, secure print function.' 
),

(LOWER(HEX(RANDOMBLOB(16))), '345678', 'Brother HL-L3270CDW', 
'Brand: Brother  
Model: HL-L3270CDW  
Type: Color Laser Printer  
Resolution: 2400 x 600 dpi  
Speed: 25 ppm  
Network: Ethernet, Wi-Fi  
IP Address: 192.168.1.202  
MAC Address: 00:2B:3C:4D:5E:6F  
Additional Info: Wireless printing with mobile support (AirPrint, Google Cloud Print).'
),

(LOWER(HEX(RANDOMBLOB(16))), '456789', 'Epson EcoTank ET-4850', 
'Brand: Epson  
Model: EcoTank ET-4850  
Type: Inkjet Printer  
Resolution: 4800 x 1200 dpi  
Speed: 15 ppm (black), 8 ppm (color)  
Network: Ethernet, Wi-Fi, USB  
IP Address: 192.168.1.203  
MAC Address: 00:2C:3D:4E:5F:6G  
Additional Info: High-capacity ink tank system for cost-effective printing.'
);
