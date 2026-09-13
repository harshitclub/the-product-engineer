# The Complete Docker & Containerization Master Guide

> A friendly, in-depth, and practical handbook covering everything you need to know about Docker—from understanding containers and installing Docker on Windows, macOS, and Linux, to running production databases (PostgreSQL, MongoDB, Redis), mastering persistent storage with Docker Volumes, and orchestrating full-stack stacks with Docker Compose.

---

## 1. The Mental Model: Why Does Docker Exist?

Before diving into commands, let's understand the real-world engineering problem Docker solves.

### The "It Works on My Machine!" Nightmare
Imagine you are building a modern web application on your laptop with **Node.js v20** and **PostgreSQL v16**. Everything runs smoothly. You hand your project over to a teammate or deploy it to a production Linux server:
* Your teammate's laptop runs **Node.js v16**—and your modern code crashes with syntax errors.
* The production server has **PostgreSQL v12** installed—and your SQL migration scripts fail.
* Operating system dependencies (like image processing libraries or C++ build tools) are missing on the server.

You end up uttering the most infamous phrase in software history:
> *"I don't know why it broke... it works on my machine!"*

```text
┌─────────────────────────┐               ┌─────────────────────────┐
│     Your Laptop (Mac)   │               │   Server / Teammate     │
├─────────────────────────┤               ├─────────────────────────┤
│ Node.js v20.2           │     ❌ ──▶    │ Node.js v16.1 (Outdated)│
│ Postgres v16            │  Dependency   │ Postgres v12 (Incompatible)
│ macOS Darwin Kernel     │   Conflict    │ Ubuntu Linux Kernel     │
└─────────────────────────┘               └─────────────────────────┘
```

### How Docker Solves This
Docker packages your code **plus every single dependency it needs to run** (the exact Node.js runtime, system libraries, configuration files, environment variables, and folder structures) into a portable, isolated package called a **Container**.

If a container runs on your laptop, **it will run exactly the same way on your teammate's computer, on an AWS cloud server, or anywhere else Docker is installed**.

---

### Virtual Machines (VMs) vs. Docker Containers

Beginners often ask: *"Isn't a Docker container just a Virtual Machine like VirtualBox or VMware?"*

The answer is **no**. While both provide isolation, their internal architectures are completely different:

```text
       VIRTUAL MACHINE (Heavy)                     DOCKER CONTAINER (Lightweight)
┌──────────────────────────────────────┐       ┌──────────────────────────────────────┐
│  App A       │  App B       │ App C  │       │  App A       │  App B       │ App C  │
├──────────────┼──────────────┼────────┤       ├──────────────┼──────────────┼────────┤
│  Bins / Libs │  Bins / Libs │ Libs   │       │  Bins / Libs │  Bins / Libs │ Libs   │
├──────────────┼──────────────┼────────┤       ├──────────────────────────────────────┤
│  Guest OS    │  Guest OS    │Guest OS│       │             Docker Engine            │
│  (Windows)   │  (Ubuntu)    │(Fedora)│       ├──────────────────────────────────────┤
├──────────────────────────────────────┤       │           Host Operating System      │
│          Hypervisor (Type 1/2)       │       │             (Linux / macOS)          │
├──────────────────────────────────────┤       ├──────────────────────────────────────┤
│          Physical Hardware           │       │           Physical Hardware          │
└──────────────────────────────────────┘       └──────────────────────────────────────┘
```

| Feature | Virtual Machine (VM) | Docker Container |
| :--- | :--- | :--- |
| **Architecture** | Emulates physical hardware + entire Guest OS | Shares the Host OS Kernel directly |
| **Startup Time** | Minutes (boots a complete operating system) | **Milliseconds** (starts like a regular process) |
| **RAM & CPU Overhead** | Heavy (requires 2–4 GB RAM per VM just for OS) | **Ultra-light** (consumes only what your app uses) |
| **Storage Size** | Gigabytes to tens of Gigabytes (e.g., 20 GB) | **Megabytes** (e.g., 20 MB – 200 MB) |
| **Isolation** | Hardware-level virtualization | OS-level process isolation (Namespaces & Cgroups) |

---

### Images vs. Containers: The Core Breakthrough

Understanding the difference between an **Image** and a **Container** is 90% of the battle in Docker:

1. **Docker Image (The Blueprint / Recipe)**:
   * A read-only, static template containing application code, libraries, and instructions.
   * Think of it as a **Class** in Object-Oriented Programming, or a **Cake Recipe**, or an **Architectural Blueprint**.
2. **Docker Container (The Living Instance)**:
   * A running, runnable process created from an image.
   * Think of it as an **Object (Instance)** of that Class, or the **Baked Cake**, or the **Physical House**.
   * You can spin up 10 identical, completely independent containers from a single image!

```text
┌─────────────────────────┐
│      Docker Image       │ ── (Blueprint / Read-Only Template)
└─────────────────────────┘
             │
             ├──▶ docker run ──▶ Container #1 (Running on port 3000)
             ├──▶ docker run ──▶ Container #2 (Running on port 3001)
             └──▶ docker run ──▶ Container #3 (Running on port 3002)
```

---

### The Docker Architecture: How the Pieces Talk

Docker consists of three primary components:
1. **Docker Client (CLI)**: The command-line tool you type commands into (e.g., `docker run`, `docker ps`).
2. **Docker Host (Daemon - `dockerd`)**: The background engine service running on your machine that listens for commands, downloads images, and manages running containers.
3. **Docker Hub (Registry)**: The public cloud library ([hub.docker.com](https://hub.docker.com)) where official pre-built images (Postgres, Node, Mongo, Redis, Nginx, Python) are hosted.

```text
  You (Terminal)                Your Laptop Engine                   Cloud
┌────────────────┐             ┌─────────────────────┐       ┌────────────────────┐
│  docker pull   │ ──────────▶ │    Docker Daemon    │ ────▶ │     Docker Hub     │
│  docker run    │             │      (dockerd)      │ ◀──── │  (Image Registry)  │
└────────────────┘             └─────────────────────┘       └────────────────────┘
                                         │
                                         ▼
                               [ Running Containers ]
```

---

## 2. Installation Step-by-Step (Windows, macOS, Linux)

Let's get Docker properly installed on your machine. Choose your operating system below:

### A. Windows 10 / Windows 11 (Docker Desktop)

On Windows, the easiest and recommended way is simply installing **Docker Desktop**:

1. **Download the Installer**:
   * Go to the official download page: [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop/)
   * Click **"Download for Windows"** to get the installer (`.exe`).

2. **Run the Installation**:
   * Double-click the downloaded installer file.
   * Follow the simple on-screen setup prompts and click **OK** / **Install**.
   * When installation completes, click **Close and restart** if your computer asks for a quick reboot.

3. **Launch Docker Desktop**:
   * Open **Docker Desktop** from your Windows Start Menu or desktop shortcut.
   * Accept the service agreement on first launch.
   * Wait a few seconds until the status indicator in the bottom-left corner of Docker Desktop turns **green** (showing *"Engine running"*).

4. **Ready to Go!**:
   * As long as Docker Desktop is open in your system tray, Docker is running in the background!
   * You can open **PowerShell**, **Command Prompt**, or your favorite terminal and start using `docker` commands directly.

---

### B. macOS (Docker Desktop for Mac)

1. **Check your Mac Chip**:
   * Click the Apple logo (``) at the top left ➔ **About This Mac**.
   * Note whether your Mac uses an **Apple Silicon (M1, M2, M3, M4)** chip or an **Intel** processor.

2. **Download & Install**:
   * Go to [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop/).
   * Click **"Mac with Apple Silicon"** (for M1/M2/M3/M4) or **"Mac with Intel chip"**.
   * Open the downloaded `.dmg` file and drag **Docker.app** into your **Applications** folder.

3. **Launch Docker**:
   * Open Docker from your Applications or Spotlight (`Cmd + Space` ➔ "Docker").
   * Grant the necessary system helper permissions when prompted.
   * You will see the Docker whale icon in your top menu bar.

---

### C. Linux (Ubuntu / Debian - Native Docker Engine)

On Linux servers and developer workstations, you don't need a heavy GUI. You can install the native, blazingly fast **Docker Engine** via the official terminal repository:

1. **Uninstall older versions (if any)**:
   ```bash
   sudo apt-get remove docker docker-engine docker.io containerd runc
   ```

2. **Set up Docker's official apt repository**:
   ```bash
   sudo apt-get update
   sudo apt-get install -y ca-certificates curl gnupg
   
   # Add Docker official GPG key:
   sudo install -m 0755 -d /etc/apt/keyrings
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
   sudo chmod a+r /etc/apt/keyrings/docker.gpg

   # Add repository to apt sources:
   echo \
     "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
     "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
     sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
   ```

3. **Install Docker Engine & Compose**:
   ```bash
   sudo apt-get update
   sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
   ```

4. **Critical Linux Post-Install Step (Run without `sudo`)**:
   By default, only `root` can communicate with the Docker daemon. To run Docker commands as your regular user without typing `sudo` every time:
   ```bash
   # Create docker group (if not created) and add current user
   sudo usermod -aG docker $USER
   
   # Apply group changes immediately:
   newgrp docker
   ```

---

### Verification: The "Hello World" Test

Open your terminal (PowerShell, Command Prompt, macOS Terminal, or Linux Bash) and run:

```bash
docker --version
```
*Expected Output:* `Docker version 27.x.x, build ...`

Now run the official test container:
```bash
docker run hello-world
```

**What just happened?**
1. Your Docker client asked the local daemon: *"Do we have the image `hello-world` locally?"*
2. The daemon checked your laptop and found nothing.
3. The daemon contacted **Docker Hub**, downloaded the lightweight image, and stored it locally.
4. The daemon created an isolated container from that image, ran it, printed a welcome message to your terminal, and gracefully exited.

---

## 3. Core Docker Commands & Everyday CLI Mastery

Before jumping into databases, let's learn the fundamental commands you'll use every day as a product engineer.

### 1. Searching and Pulling Images
To download an image from Docker Hub to your laptop without running it yet:
```bash
docker pull <image_name>:<tag>
```
*Example:*
```bash
docker pull node:20-alpine
docker pull postgres:16-alpine
```
> **What is `:alpine`?** Standard Linux distributions (like Ubuntu or Debian) are 100MB–200MB. **Alpine Linux** is a microscopic, security-oriented Linux distro of only **5 MB**! Always look for alpine tags when you want fast downloads and small disk footprint.

To list all images currently saved on your machine:
```bash
docker images
```

---

### 2. Running Containers: The Essential Flags Demystified

The `docker run` command creates and starts a container from an image. Here is the golden formula:

```bash
docker run [FLAGS] <IMAGE_NAME>
```

Here are the **6 most important flags** you must know:

| Flag | Name | Why It Matters |
| :--- | :--- | :--- |
| `-d` | **Detached Mode** | Runs the container in the **background**, leaving your terminal free for other commands. Without `-d`, the container takes over your terminal window. |
| `-p host:container` | **Port Forwarding** | Connects a port on your physical computer to a port inside the isolated container. E.g., `-p 3000:80` maps your laptop's `localhost:3000` to the container's internal port `80`. |
| `--name <custom_name>` | **Custom Name** | Gives your container an easy-to-remember name (like `--name my-db`). If omitted, Docker assigns funny random names like `brave_curie` or `nervous_pasteur`. |
| `-e KEY=VALUE` | **Environment Variable** | Injects runtime configurations (passwords, database names, API tokens) into the container. |
| `-it` | **Interactive TTY** | Connects your keyboard directly to the container's internal terminal so you can interact with it live. |
| `--rm` | **Auto-Cleanup** | Automatically deletes the container from disk as soon as it stops running. Ideal for one-off tasks and tests. |

---

### 3. Inspecting and Managing Running Containers

* **List active containers**:
  ```bash
  docker ps
  ```
* **List all containers (including stopped / exited ones)**:
  ```bash
  docker ps -a
  ```
* **Stop a running container**:
  ```bash
  docker stop <container_name_or_id>
  ```
* **Start a previously stopped container**:
  ```bash
  docker start <container_name_or_id>
  ```
* **Restart a container**:
  ```bash
  docker restart <container_name_or_id>
  ```
* **View live logs of a container** (essential for debugging backend crashes):
  ```bash
  docker logs -f <container_name_or_id>
  ```
  *(Press `Ctrl + C` to exit the log stream).*

---

### 4. Stepping Inside a Running Container (`docker exec`)

`docker exec` is your secret weapon. It allows you to run any command **inside an already running container**, including spawning an interactive bash or shell session:

```bash
docker exec -it <container_name> sh
# or for containers with full bash:
docker exec -it <container_name> bash
```

Once inside, you are literally inside the isolated Linux environment of the container! When done exploring, type `exit` to return to your normal computer terminal.

---

### 5. Deleting Containers and Images

* **Delete a stopped container**:
  ```bash
  docker rm <container_name_or_id>
  ```
* **Force-stop and delete a running container in one step**:
  ```bash
  docker rm -f <container_name_or_id>
  ```
* **Delete a downloaded image**:
  ```bash
  docker rmi <image_name_or_id>
  ```

---

## 4. Hands-On Lab 1: PostgreSQL Container Mastery

Now let's get our hands dirty with real-world databases! We will spin up a modern **PostgreSQL** database, connect to it over port `5432`, step into its interactive SQL terminal (`psql`), create a schema, and insert data.

```text
  Your Laptop (Host)                         PostgreSQL Container
┌──────────────────────┐                     ┌──────────────────────────────┐
│  Terminal / Node App │ ──▶ Port 5432 ────▶ │  PostgreSQL 16 Engine        │
│  (localhost:5432)    │                     │  Internal Port: 5432         │
└──────────────────────┘                     │  Database: devdb             │
                                             │  User: postgres              │
                                             └──────────────────────────────┘
```

### Step 1: Launch PostgreSQL in the Background

Run the following command in your terminal:

```bash
docker run -d \
  --name local-postgres \
  -p 5432:5432 \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=mysecretpassword \
  -e POSTGRES_DB=devdb \
  postgres:16-alpine
```

**Let's dissect what each flag did:**
* `-d`: Runs in background (detached).
* `--name local-postgres`: Names the container `local-postgres`.
* `-p 5432:5432`: Maps your laptop's port `5432` to the container's internal PostgreSQL port `5432`.
* `-e POSTGRES_USER=postgres`: Sets default superuser.
* `-e POSTGRES_PASSWORD=mysecretpassword`: Sets the database root password.
* `-e POSTGRES_DB=devdb`: Tells Postgres to automatically create a database named `devdb` upon startup.
* `postgres:16-alpine`: The lightweight official PostgreSQL 16 image.

### Step 2: Verify the Database is Healthy

Check that your container is actively running:
```bash
docker ps
```
You should see `local-postgres` listed with status `Up ... (healthy)`.

---

### Step 3: Enter the PostgreSQL Interactive Terminal (`psql`)

Instead of installing `psql` or graphical database tools on your laptop, we can jump directly into the container's built-in `psql` client using `docker exec -it`:

```bash
docker exec -it local-postgres psql -U postgres -d devdb
```

Your terminal prompt will instantly change to:
```text
devdb=#
```
You are now live inside the PostgreSQL SQL engine!

---

### Step 4: Essential PostgreSQL Commands Inside the Terminal

Try executing these practical SQL commands one by one:

#### 1. List all databases:
```sql
\l
```
*(Shows `devdb`, `postgres`, and default template databases).*

#### 2. Create a table:
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  role VARCHAR(20) DEFAULT 'member',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 3. Inspect the table schema:
```sql
\d users
```
*(Lists all columns, data types, primary keys, and default values).*

#### 4. List all tables in current database:
```sql
\dt
```

#### 5. Insert sample user records:
```sql
INSERT INTO users (name, email, role) VALUES 
  ('Harshit Kumar', 'harshit@example.com', 'admin'),
  ('Alex Rivera', 'alex@example.com', 'developer'),
  ('Sara Chen', 'sara@example.com', 'designer');
```

#### 6. Query the records:
```sql
SELECT id, name, email, role, created_at FROM users;
```
*Output:*
```text
 id |     name      |        email        |   role    |         created_at         
----+---------------+---------------------+-----------+----------------------------
  1 | Harshit Kumar | harshit@example.com | admin     | 2026-09-13 17:30:15.123456
  2 | Alex Rivera   | alex@example.com    | developer | 2026-09-13 17:30:15.123456
  3 | Sara Chen     | sara@example.com    | designer  | 2026-09-13 17:30:15.123456
(3 rows)
```

#### 7. Exit back to your computer terminal:
```sql
\q
```
*(Typing `\q` safely disconnects and brings you right back to your computer prompt).*

---

## 5. Hands-On Lab 2: MongoDB Container Mastery

Now let's spin up **MongoDB**, the industry standard NoSQL document database. We will run it in Docker and use the modern official interactive shell, **`mongosh`**, to store and query JSON-like BSON documents.

### Step 1: Launch MongoDB Container

Run this command in your terminal:

```bash
docker run -d \
  --name local-mongo \
  -p 27017:27017 \
  mongo:latest
```

* `-p 27017:27017`: Maps the standard MongoDB port `27017` from container to your laptop.
* `mongo:latest`: Uses the official MongoDB community image.

Verify it is running:
```bash
docker ps
```

---

### Step 2: Enter the MongoDB Shell (`mongosh`)

Execute the `mongosh` CLI inside the running container:

```bash
docker exec -it local-mongo mongosh
```

Your prompt will change to:
```text
test>
```
You are now connected to the live MongoDB instance!

---

### Step 3: Essential MongoDB Commands Inside the Terminal

#### 1. Show existing databases:
```javascript
show dbs
```

#### 2. Switch to a new database (e.g. `ecommerce`):
```javascript
use ecommerce
```
*(In MongoDB, databases and collections are created automatically as soon as you insert the first document!)*

#### 3. Insert a single document:
```javascript
db.products.insertOne({
  title: "Mechanical Keychron K2",
  price: 99.99,
  category: "Hardware",
  inStock: true,
  tags: ["gadgets", "workstation", "typing"]
});
```

#### 4. Insert multiple documents at once:
```javascript
db.products.insertMany([
  { title: "Wireless Gaming Mouse", price: 49.99, category: "Hardware", inStock: true },
  { title: "UltraWide 34-inch Monitor", price: 499.00, category: "Hardware", inStock: false },
  { title: "Ergonomic Desk Mat", price: 24.50, category: "Accessories", inStock: true }
]);
```

#### 5. Find and display all documents:
```javascript
db.products.find()
```

#### 6. Filter documents with queries:
Find products where `inStock` is `true` and `price` is less than `$100`:
```javascript
db.products.find({ 
  inStock: true, 
  price: { $lt: 100 } 
})
```

#### 7. Count total items in the collection:
```javascript
db.products.countDocuments()
```
*Output:* `4`

#### 8. Exit back to host terminal:
```javascript
exit
```

---

## 6. Hands-On Lab 3: Redis In-Memory Cache Mastery

**Redis** (Remote Dictionary Server) is an ultra-fast in-memory key-value database commonly used for caching web sessions, leaderboard rankings, API rate limiting, and background job queues.

Let's spin up Redis in Docker and test its core data structures using **`redis-cli`**.

### Step 1: Launch Redis Container

Run:
```bash
docker run -d \
  --name local-redis \
  -p 6379:6379 \
  redis:alpine
```

* `-p 6379:6379`: Maps Redis default port `6379`.
* `redis:alpine`: Extremely small image (~15 MB).

---

### Step 2: Enter the Redis CLI

Connect straight into Redis using `redis-cli`:

```bash
docker exec -it local-redis redis-cli
```

Your prompt will change to:
```text
127.0.0.1:6379>
```

---

### Step 3: Essential Redis Commands Inside the Terminal

#### 1. Heartbeat check (PING / PONG):
```text
127.0.0.1:6379> PING
PONG
```

#### 2. Storing and retrieving basic Strings (Key-Value):
```text
127.0.0.1:6379> SET user_session:88 "valid_auth_token_xyz"
OK

127.0.0.1:6379> GET user_session:88
"valid_auth_token_xyz"
```

#### 3. Automatic Expiration & TTL (Time To Live):
Store an OTP or temporary auth token that self-destructs after 60 seconds:
```text
127.0.0.1:6379> SET password_reset_otp "829103" EX 60
OK
```
Check how many seconds are left before it vanishes:
```text
127.0.0.1:6379> TTL password_reset_otp
(integer) 54

127.0.0.1:6379> TTL password_reset_otp
(integer) 12
```
Once the timer hits `0`, the key returns `(nil)` automatically!

#### 4. Hashes (Storing Structured Objects):
Store an entire user profile object in a single key:
```text
127.0.0.1:6379> HSET user:100 name "Harshit" role "Product Engineer" points 500
(integer) 3

127.0.0.1:6379> HGETALL user:100
1) "name"
2) "Harshit"
3) "role"
4) "Product Engineer"
5) "points"
6) "500"

127.0.0.1:6379> HGET user:100 role
"Product Engineer"
```

#### 5. Lists (Job Queues / Event Streaming):
Push items to a background job queue:
```text
127.0.0.1:6379> LPUSH job_queue "send_welcome_email"
(integer) 1
127.0.0.1:6379> LPUSH job_queue "generate_invoice_pdf"
(integer) 2
```
Worker process pulls the oldest job from the right end of the queue:
```text
127.0.0.1:6379> RPOP job_queue
"send_welcome_email"
```

#### 6. Searching and Deleting Keys:
```text
127.0.0.1:6379> KEYS *
127.0.0.1:6379> DEL user_session:88
(integer) 1
```

#### 7. Exit back to your computer terminal:
```text
127.0.0.1:6379> exit
```

---

## 7. The Data Persistence Dilemma & Docker Volumes Masterclass

Here lies the single most dangerous trap for beginners in Docker:

> [!CAUTION]
> **Containers are Ephemeral (Temporary)!**
> By default, any file or database record written inside a container lives in the container's temporary writable layer. If you stop and delete the container (`docker rm`), **every single database record, upload, or table is deleted forever!**

```text
               WITHOUT VOLUMES (Data Loss)
┌────────────────────────────────────────────────────────┐
│  Container (PostgreSQL)                                │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Temporary Writable Layer: Users, Orders, Logs    │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
                           │
                 docker rm -f container
                           │
                           ▼
                    💥 ALL DATA GONE!
```

To persist data safely across container crashes, restarts, and updates, Docker provides **Docker Volumes**.

---

### Storage Options Compared: Volumes vs. Bind Mounts

```text
┌─────────────────────────────────────────────────────────────────┐
│                      YOUR LAPTOP / HOST OS                      │
│                                                                 │
│   [ Named Volume ]               [ Bind Mount ]                 │
│   Managed by Docker Engine       Direct folder on your computer │
│   Path: /var/lib/docker/volumes  Path: e:\project\src           │
└──────────────┬──────────────────────────────────┬───────────────┘
               │                                  │
               ▼                                  ▼
   Mounted into Container             Mounted into Container
   /var/lib/postgresql/data           /app/src
```

1. **Named Volumes (`docker volume create ...`)**:
   * Stored in a dedicated, isolated area managed by Docker engine on your host machine.
   * **Best for**: Databases (Postgres, Mongo, MySQL, Redis) and production data persistence.
2. **Bind Mounts (`-v $(pwd):/app`)**:
   * Mounts an exact file or folder from your laptop (e.g., your project's `src/` folder) directly into the container.
   * **Best for**: Local development. When you change code in VS Code, the container immediately sees the changes without rebuilding!

---

### Hands-On Laboratory: The "Disaster & Recovery" Experiment

Let's prove that Docker Volumes keep data safe even when a container is completely destroyed!

#### Step 1: Create a Dedicated Named Volume
```bash
docker volume create pg_master_storage
```
Verify the volume was created:
```bash
docker volume ls
```

---

#### Step 2: Start PostgreSQL with the Volume Attached
We use the `-v <volume_name>:<container_path>` flag. For PostgreSQL, the internal database files live at `/var/lib/postgresql/data`:

```bash
docker run -d \
  --name pg-safe-db \
  -p 5432:5432 \
  -e POSTGRES_PASSWORD=safepassword \
  -e POSTGRES_DB=company \
  -v pg_master_storage:/var/lib/postgresql/data \
  postgres:16-alpine
```

---

#### Step 3: Insert Critical Production Data
Jump into the database and create a table:

```bash
docker exec -it pg-safe-db psql -U postgres -d company
```

Run these SQL queries:
```sql
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  salary INT
);

INSERT INTO employees (name, salary) VALUES 
  ('Alice Johnson', 95000),
  ('Bob Smith', 82000);

SELECT * FROM employees;
\q
```

---

#### Step 4: Destroy the Container Ruthlessly!
Now simulate a complete server crash or accidental container deletion:

```bash
docker rm -f pg-safe-db
```
Verify the container is completely gone:
```bash
docker ps -a
```
*(Notice `pg-safe-db` is not in the list!)*

---

#### Step 5: Spin Up a Completely Brand New Container Attached to the Same Volume!
Now create an entirely new container named `pg-recovered-db`, attaching the exact same `pg_master_storage` volume:

```bash
docker run -d \
  --name pg-recovered-db \
  -p 5432:5432 \
  -e POSTGRES_PASSWORD=safepassword \
  -e POSTGRES_DB=company \
  -v pg_master_storage:/var/lib/postgresql/data \
  postgres:16-alpine
```

---

#### Step 6: Verify Data Survival!
Connect to the new container:
```bash
docker exec -it pg-recovered-db psql -U postgres -d company
```
Query the table:
```sql
SELECT * FROM employees;
```
*Output:*
```text
 id |     name      | salary 
----+---------------+--------
  1 | Alice Johnson |  95000
  2 | Bob Smith     |  82000
(2 rows)
```
```sql
\q
```

🎉 **Every single record survived!** Even though the original container was wiped off your computer, the data was safely preserved inside `pg_master_storage`.

---

### Useful Volume Management Commands

* **Inspect volume details and host storage path**:
  ```bash
  docker volume inspect pg_master_storage
  ```
* **Remove an unused volume**:
  ```bash
  docker volume rm <volume_name>
  ```
* **Prune all orphaned/unused volumes** (caution: deletes unattached data):
  ```bash
  docker volume prune
  ```

---

## 8. Building Custom Images with Dockerfile

So far we've run pre-built public images from Docker Hub. But how do you containerize **your own Node.js, Python, or Go application**?

You write a text file called a **`Dockerfile`**.

### The Anatomy of a Dockerfile

A `Dockerfile` is a list of instructions executed step-by-step from top to bottom:

```dockerfile
# 1. Base Image: Choose a lightweight runtime environment
FROM node:20-alpine

# 2. Working Directory: Set the internal project folder inside the container
WORKDIR /app

# 3. Cache Optimization: Copy dependency manifests first
COPY package*.json ./

# 4. Run commands: Install production dependencies
RUN npm install --omit=dev

# 5. Copy your application source code from your laptop into the container
COPY . .

# 6. Expose Port: Document which port your app listens on
EXPOSE 3000

# 7. Default Command: The command to execute when the container starts
CMD ["node", "server.js"]
```

---

### The All-Important `.dockerignore` File

Just like `.gitignore` stops junk files from going to GitHub, a **`.dockerignore`** file prevents huge, bloated, or confidential folders from being copied into your Docker image:

Create a file named `.dockerignore` in your project root:
```text
node_modules
npm-debug.log
.git
.env
dist
.DS_Store
```

> **Why exclude `node_modules`?**
> If you are on Windows or macOS and copy your local `node_modules` into a Linux container, native C++ binaries (like `bcrypt` or `sharp`) will fail to execute! Always let `RUN npm install` build native dependencies fresh inside Linux.

---

### Building and Tagging Your Image

To build an image from your `Dockerfile`, open your terminal in your project root and run:

```bash
docker build -t my-express-api:1.0.0 .
```

* `-t my-express-api:1.0.0`: Tags your image with a readable name and version.
* `.`: Specifies the build context (current directory containing the `Dockerfile`).

Now run your custom container:
```bash
docker run -d --name my-api -p 3000:3000 my-express-api:1.0.0
```
Open `http://localhost:3000` in your web browser—your custom app is now running inside Docker!

---

## 9. Multi-Container Orchestration with Docker Compose

In production, an application rarely runs alone. A typical real-world system consists of:
1. A **Node.js Web API**
2. A **PostgreSQL Database**
3. A **Redis Cache**
4. An **Adminer / pgAdmin** visual database GUI

Typing four lengthy `docker run` commands with ports, passwords, and volumes manually every time is error-prone.

Enter **Docker Compose**! It allows you to define your entire multi-container architecture in a single declarative YAML file called **`docker-compose.yml`**.

### The `docker-compose.yml` Blueprint

Create a file named `docker-compose.yml`:

```yaml
version: '3.8'

services:
  # 1. PostgreSQL Database Service
  database:
    image: postgres:16-alpine
    container_name: app_postgres
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: secretpassword
      POSTGRES_DB: myapp_db
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  # 2. Redis Cache Service
  cache:
    image: redis:alpine
    container_name: app_redis
    restart: always
    ports:
      - "6379:6379"

  # 3. Visual Web GUI for Database Management
  adminer:
    image: adminer:latest
    container_name: app_adminer
    restart: always
    ports:
      - "8080:8080"
    depends_on:
      - database

# Persistent volumes definitions
volumes:
  pgdata:
```

---

### The 4 Magic Docker Compose Commands

Now you can control your entire multi-container architecture with simple commands:

#### 1. Spin up all containers in the background:
```bash
docker compose up -d
```
Docker will automatically pull images, create an internal bridge network, create persistent volumes, and start all services in proper dependency order!

#### 2. Check the status of all services:
```bash
docker compose ps
```

#### 3. Stream combined logs from all containers:
```bash
docker compose logs -f
```

#### 4. Stop and remove all containers cleanly:
```bash
docker compose down
```
*(To stop containers and also delete their persistent volumes, use `docker compose down -v`).*

---

## 10. Housekeeping, Debugging & Container Cleanup

Over time, unused containers, obsolete images, and dangling build caches will eat up gigabytes of disk space on your laptop. Here is how to keep your system clean and debug issues like a senior engineer:

### 1. Monitoring Resource Usage Live (`docker stats`)
Want to see how much CPU and RAM your containers are using?
```bash
docker stats
```
*Displays a real-time live dashboard showing CPU %, Memory Usage, Memory %, Network I/O, and PID count!*

### 2. Inspecting Container Health Details
```bash
docker inspect <container_name>
```
*Outputs a complete JSON object with internal IP addresses, mounted volumes, environment variables, and network gateway configs.*

### 3. The Ultimate Nuclear Cleanup Command
When Docker is taking up 30 GB of storage and you want to reclaim all wasted disk space:

```bash
docker system prune -a --volumes
```
> [!WARNING]
> This command deletes:
> * All stopped containers
> * All networks not used by at least one container
> * All unused images (dangling and unreferenced)
> * All unused build cache

---

## 11. The Ultimate Docker Quick-Reference Cheat Sheet

Keep this reference table bookmarked for your daily engineering workflow:

| Task / Goal | Command |
| :--- | :--- |
| **Check Docker version** | `docker --version` |
| **Download an image** | `docker pull <image>:<tag>` |
| **List local images** | `docker images` |
| **Run container in background** | `docker run -d --name <name> -p <host:cont> <image>` |
| **List running containers** | `docker ps` |
| **List ALL containers (even stopped)** | `docker ps -a` |
| **Stop a running container** | `docker stop <name>` |
| **Start a stopped container** | `docker start <name>` |
| **View live logs** | `docker logs -f <name>` |
| **Enter container terminal (psql, sh, bash)**| `docker exec -it <name> <command>` |
| **Delete a stopped container** | `docker rm <name>` |
| **Force-kill & delete a container** | `docker rm -f <name>` |
| **Delete a local image** | `docker rmi <image_id>` |
| **List persistent volumes** | `docker volume ls` |
| **Create a named volume** | `docker volume create <vol_name>` |
| **Inspect a volume's host path** | `docker volume inspect <vol_name>` |
| **Build an image from Dockerfile** | `docker build -t <app_name>:<tag> .` |
| **Launch multi-container Compose** | `docker compose up -d` |
| **Stop & remove Compose stack** | `docker compose down` |
| **View live CPU/RAM metrics** | `docker stats` |
| **Reclaim disk space (prune everything)** | `docker system prune -a --volumes` |

---

## What's Next?
Now that you have mastered version control with **[Git & GitHub](/devops/git/)** and containerization with **Docker**, you are ready to explore automated **CI/CD pipelines with GitHub Actions** to automatically build and test your Docker containers on every pull request!
