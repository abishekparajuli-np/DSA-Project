"""
Sample Data Generator
Creates sample datasets for testing: students, sales, sensors
"""

import random
import csv
import os

class SampleDataGenerator:
    
    @staticmethod
    def generate_students(count=50):
        """Generate student records"""
        first_names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Henry', 
                       'Ivy', 'Jack', 'Kate', 'Liam', 'Mia', 'Noah', 'Olivia', 'Peter',
                       'Quinn', 'Rachel', 'Sam', 'Tina']
        last_names = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller',
                      'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez']
        departments = ['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology']
        
        students = []
        for i in range(count):
            student_id = f"STU{1000 + i}"
            name = f"{random.choice(first_names)} {random.choice(last_names)}"
            department = random.choice(departments)
            marks = round(random.uniform(40, 100), 2)
            age = random.randint(18, 25)
            gpa = round(marks / 25, 2)  # Convert marks to GPA scale
            
            students.append({
                'student_id': student_id,
                'name': name,
                'department': department,
                'marks': marks,
                'age': age,
                'gpa': gpa
            })
        
        return students
    
    @staticmethod
    def generate_sales(count=50):
        """Generate sales data"""
        products = ['Laptop', 'Phone', 'Tablet', 'Headphones', 'Monitor', 'Keyboard',
                   'Mouse', 'Webcam', 'Speaker', 'Charger']
        categories = ['Electronics', 'Accessories', 'Peripherals']
        regions = ['North', 'South', 'East', 'West']
        
        sales = []
        for i in range(count):
            sale_id = f"SALE{2000 + i}"
            product = random.choice(products)
            category = random.choice(categories)
            region = random.choice(regions)
            quantity = random.randint(1, 50)
            price = round(random.uniform(10, 2000), 2)
            revenue = round(quantity * price, 2)
            month = random.randint(1, 12)
            
            sales.append({
                'sale_id': sale_id,
                'product': product,
                'category': category,
                'region': region,
                'quantity': quantity,
                'price': price,
                'revenue': revenue,
                'month': month
            })
        
        return sales
    
    @staticmethod
    def generate_sensors(count=50):
        """Generate sensor readings"""
        sensor_types = ['Temperature', 'Humidity', 'Pressure', 'Light', 'Motion']
        locations = ['Room A', 'Room B', 'Room C', 'Warehouse', 'Office']
        
        sensors = []
        for i in range(count):
            sensor_id = f"SENS{3000 + i}"
            sensor_type = random.choice(sensor_types)
            location = random.choice(locations)
            
            # Generate appropriate reading based on sensor type
            if sensor_type == 'Temperature':
                reading = round(random.uniform(15, 35), 2)
                unit = '°C'
            elif sensor_type == 'Humidity':
                reading = round(random.uniform(30, 80), 2)
                unit = '%'
            elif sensor_type == 'Pressure':
                reading = round(random.uniform(900, 1100), 2)
                unit = 'hPa'
            elif sensor_type == 'Light':
                reading = round(random.uniform(0, 1000), 2)
                unit = 'lux'
            else:  # Motion
                reading = round(random.uniform(0, 100), 2)
                unit = 'count'
            
            timestamp = i * 60  # 1 minute intervals
            status = random.choice(['active', 'active', 'active', 'maintenance'])
            
            sensors.append({
                'sensor_id': sensor_id,
                'type': sensor_type,
                'location': location,
                'reading': reading,
                'unit': unit,
                'timestamp': timestamp,
                'status': status
            })
        
        return sensors
    
    @staticmethod
    def save_to_csv(data, filename):
        """Save data to CSV file"""
        if not data:
            return False
        
        os.makedirs(os.path.dirname(filename), exist_ok=True)
        
        keys = data[0].keys()
        with open(filename, 'w', newline='') as f:
            writer = csv.DictWriter(f, fieldnames=keys)
            writer.writeheader()
            writer.writerows(data)
        
        return True
    
    @staticmethod
    def generate_all_samples(output_dir='data'):
        """Generate all sample datasets and save to CSV"""
        students = SampleDataGenerator.generate_students(50)
        sales = SampleDataGenerator.generate_sales(50)
        sensors = SampleDataGenerator.generate_sensors(50)
        
        SampleDataGenerator.save_to_csv(
            students,
            os.path.join(output_dir, 'students.csv')
        )
        SampleDataGenerator.save_to_csv(
            sales,
            os.path.join(output_dir, 'sales.csv')
        )
        SampleDataGenerator.save_to_csv(
            sensors,
            os.path.join(output_dir, 'sensors.csv')
        )
        
        return {
            'students': students,
            'sales': sales,
            'sensors': sensors
        }
