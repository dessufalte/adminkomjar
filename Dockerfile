# Gunakan image Node.js resmi yang ringan
FROM node:18-alpine

# Set direktori kerja di dalam container
WORKDIR /app

# Salin file package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Salin seluruh kode project
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build Next.js untuk production
RUN npm run build

# Expose port yang dipakai Next.js (default 3000)
EXPOSE 3000

# Jalankan Next.js
CMD ["npm", "run", "start"]
