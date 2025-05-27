# Use Python 3.12 Alpine as base image for a lightweight container
FROM python:3.12-alpine

# Set the working directory in the container
WORKDIR /app

# Copy only the requirements file first to leverage Docker cache
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY app.py util.py ./

# Command to run the application
ENTRYPOINT ["python3", "app.py"]