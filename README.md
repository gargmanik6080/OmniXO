# OmniXO - Tic Tac Toe Game

OmniXO is a containerized full-stack Tic Tac Toe game with an AI opponent. It consists of a React frontend and a Flask backend, both designed to run as microservices in Kubernetes.

## Project Structure

```
.
├── client/               # React frontend
│   ├── Dockerfile       # Client container configuration
│   ├── src/             # React source code
│   │   ├── components/  # Reusable UI components
│   │   └── pages/      # Page components
│   └── vite.config.js   # Vite configuration with proxy setup
└── server/              # Flask backend
    ├── Dockerfile       # Server container configuration
    ├── app.py          # Flask application
    └── util.py         # Game logic and AI
```

## Technologies Used

### Frontend
- React 18
- Vite
- TailwindCSS
- Docker (Node 18 Alpine)

### Backend
- Python 3.12
- Flask
- Waitress WSGI server
- Docker (Python 3.12 Alpine)

## Docker Images

Both components are containerized and can be built separately:

### Building the Server
```bash
cd server
docker build -t omnixo-server:latest .
```

### Building Multi-Platform Images
For production deployment on different architectures (AMD64/ARM64):

```bash
# Server - multi-platform build and push
cd server
docker buildx build --platform linux/amd64,linux/arm64 -t gargmanik6080/server:latest --push .

# Client - multi-platform build and push  
cd client
docker buildx build --platform linux/amd64,linux/arm64 -t gargmanik6080/client:latest --push .
```

### Building the Client
```bash
cd client
docker build -t omnixo-client:latest .
```

## Kubernetes Deployment

This application is designed to be deployed on AWS EKS. The Kubernetes manifests and Terraform configuration can be found in the [terraform-aws-eks-journey](https://github.com/gargmanik6080/terraform-aws-eks-journey) repository.

### Service Communication
- The React client communicates with the Flask server through a Kubernetes service named `omnixo-server`
- API requests are proxied through `/api` endpoint
- CORS is enabled on the server for secure communication

## Local Development

### Starting the Server
```bash
cd server
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 app.py
```

### Starting the Client
```bash
cd client
npm install
npm run dev
```

## Production Deployment

1. Build and push both Docker images to your container registry
2. Deploy to Kubernetes using the manifests in the EKS repository
3. The client will automatically discover the server through Kubernetes DNS (omnixo-server service)

## Architecture Notes

- The client container runs a production build served by `serve`
- The server uses Waitress for production-grade WSGI serving
- Both containers run on Alpine Linux for minimal footprint
- Inter-service communication is handled by Kubernetes service discovery

For deployment instructions and infrastructure setup using Terraform and EKS, this project is featured in [terraform-aws-eks-journey](https://github.com/gargmanik6080/terraform-aws-eks-journey) repository, which provides a step-by-step guide from basic EC2 instances to production-ready EKS clusters.
