# Backend Test Nexa - Irfansyah

### How to run express js app using docker
1. **Clone repository**
   ```bash
   git clone https://github.com/sayakanikan/BackendTest-Nexa---Irfansyah.git
   cd BackendTest-Nexa---Irfansyah
   ```
2. **Setup environment variables**
   ```bash
   cp .env.example .env
   ```
3. **Build app using docker**
   ```bash
   docker build -t backendtestnexa .
   docker run --name testnexa-irfansyah -p 3000:3000 --env-file .env backendtestnexa
   ```
   Note:
   - Pastikan docker anda sudah menyala
   - Pastikan nama image atau container belum ada (ganti nama image atau container bila telah digunakan)
   - Pastikan port ketika docker run masih tersedia di local anda
4. **Serve app**
   ```bash
   http://localhost:3000
   ```
