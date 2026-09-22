# Hands-On Project: Building a College Management Database

> A beginner-friendly, step-by-step tutorial where you build a real-world **College Management Database** in PostgreSQL from scratch. Follow along command-by-command to create tables, insert realistic student data, run queries, connect tables with joins, and analyze academic performance.

---

## 1. Project Overview & Blueprint

Imagine you are hired as the software engineer for **Apex Institute of Technology**. The administration office wants to move away from chaotic Excel spreadsheets into a clean, robust PostgreSQL database.

### What Will Our Database Store?
1. **Departments**: Academic branches like Computer Science, Mechanical Engineering, and Mathematics.
2. **Professors**: Faculty members employed by the college.
3. **Students**: Enrolled students with their contact details, age, and GPA.
4. **Courses**: Subjects offered across different departments (like Data Structures, Calculus, Thermodynamics).
5. **Enrollments**: The bridge connecting students to the courses they attend and their final grades.

### Visual Database Schema Blueprint
Here is how our 5 tables connect with one another:

```text
┌────────────────────────┐
│      departments       │
├────────────────────────┤
│ id (PK)                │◀──────────────┐
│ name                   │               │
│ building               │               │
│ head_of_department     │               │
└───────────┬────────────┘               │
            │                            │
            │ 1:N                        │ 1:N
            ▼                            ▼
┌────────────────────────┐   ┌────────────────────────┐
│       professors       │   │        students        │
├────────────────────────┤   ├────────────────────────┤
│ id (PK)                │   │ id (PK)                │◀──────────────┐
│ department_id (FK)     │   │ department_id (FK)     │               │
│ full_name              │   │ full_name              │               │
│ email                  │   │ email                  │               │
│ salary                 │   │ age                    │               │
│ hire_date              │   │ gpa                    │               │
└────────────────────────┘   │ enrollment_date        │               │
                             └────────────────────────┘               │
                                                                      │
┌────────────────────────┐                                            │ 1:N
│        courses         │                                            │
├────────────────────────┤                                            │
│ id (PK)                │◀──────────────┐                            │
│ department_id (FK)     │               │                            │
│ course_code            │               │                            │
│ course_name            │               │ 1:N                        │
│ credits                │               │                            │
└────────────────────────┘               ▼                            │
                             ┌────────────────────────┐               │
                             │      enrollments       │               │
                             ├────────────────────────┤               │
                             │ id (PK)                │               │
                             │ student_id (FK) ───────┼───────────────┘
                             │ course_id (FK) ────────┘
                             │ semester               │
                             │ grade                  │
                             │ status                 │
                             └────────────────────────┘
```

---

## 2. Step 1: Initialize the Project in Docker

Make sure your Docker container from the [PostgreSQL with Docker Guide](./index.md) is running.

### 1. Open the PostgreSQL Terminal
Open your terminal (PowerShell, Command Prompt, or Terminal) and run:

```bash
docker exec -it dev-postgres psql -U postgres
```

You are now inside the PostgreSQL interactive prompt:
```text
postgres=#
```

---

### 2. Create the College Database
Create a clean, dedicated database for this project:

```sql
CREATE DATABASE college_db;
```

**What this command does:**
* `CREATE DATABASE`: The SQL command to create an isolated storage space for a new application.
* `college_db`: The name of our new database.

---

### 3. Connect to the New Database
Switch from the default `postgres` database into `college_db`:

```sql
\c college_db
```

**Expected Output:**
```text
You are now connected to database "college_db" as user "postgres".
college_db=#
```

You are now ready to start building the tables!

---

## 3. Step 2: Designing & Creating Tables

We will create each table one by one. Read the explanations below each script to understand every keyword.

### Table 1: `departments`
Each department has a unique name, an office building, and a designated head of department.

```sql
CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  building VARCHAR(50) NOT NULL,
  head_of_department VARCHAR(100)
);
```

#### Keyword Explanations:
* `CREATE TABLE departments`: Tells PostgreSQL to create a new table named `departments`.
* `id SERIAL PRIMARY KEY`: 
  * `SERIAL`: Tells PostgreSQL to automatically increment this number (1, 2, 3...) whenever a new department is added.
  * `PRIMARY KEY`: Guarantees this column uniquely identifies each department and cannot be empty.
* `name VARCHAR(100) NOT NULL UNIQUE`:
  * `VARCHAR(100)`: Stores text up to 100 characters long.
  * `NOT NULL`: The department name cannot be left blank.
  * `UNIQUE`: Prevents creating two departments with the exact same name.
* `head_of_department VARCHAR(100)`: Optional text field (can be NULL if not yet assigned).

---

### Table 2: `professors`
Faculty members belong to a department and receive a monthly salary.

```sql
CREATE TABLE professors (
  id SERIAL PRIMARY KEY,
  department_id INT NOT NULL REFERENCES departments(id) ON DELETE RESTRICT,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  salary NUMERIC(10, 2) NOT NULL CHECK (salary > 0),
  hire_date DATE DEFAULT CURRENT_DATE
);
```

#### Keyword Explanations:
* `department_id INT NOT NULL REFERENCES departments(id)`: 
  * This is a **Foreign Key**. It enforces that a professor can only be assigned to a department ID that actually exists in the `departments` table.
* `ON DELETE RESTRICT`: If someone tries to delete a department that still has professors employed in it, PostgreSQL will block the deletion to prevent orphaned records.
* `salary NUMERIC(10, 2) CHECK (salary > 0)`:
  * `NUMERIC(10, 2)`: Exact decimal representation for money (up to 10 digits total, 2 digits after the decimal point).
  * `CHECK (salary > 0)`: A validation rule. PostgreSQL will reject any insert or update where salary is zero or negative.
* `hire_date DATE DEFAULT CURRENT_DATE`: If you don't provide a date, PostgreSQL automatically fills in today's date.

---

### Table 3: `students`
Stores undergraduate and graduate student records.

```sql
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  department_id INT NOT NULL REFERENCES departments(id) ON DELETE RESTRICT,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  age INT NOT NULL CHECK (age >= 16),
  gpa NUMERIC(3, 2) DEFAULT 0.00 CHECK (gpa >= 0.00 AND gpa <= 4.00),
  enrollment_date DATE DEFAULT CURRENT_DATE
);
```

#### Keyword Explanations:
* `CHECK (age >= 16)`: Ensures all enrolled students meet the minimum college age requirement.
* `gpa NUMERIC(3, 2)`: Stores Grade Point Average (e.g., `3.85`, `4.00`).
* `CHECK (gpa >= 0.00 AND gpa <= 4.00)`: Restricts GPA between 0.00 and 4.00.

---

### Table 4: `courses`
Academic subjects offered by the university.

```sql
CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  department_id INT NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
  course_code VARCHAR(10) NOT NULL UNIQUE,
  course_name VARCHAR(100) NOT NULL,
  credits INT NOT NULL CHECK (credits BETWEEN 1 AND 6)
);
```

#### Keyword Explanations:
* `course_code VARCHAR(10) NOT NULL UNIQUE`: A unique catalog code (e.g. `CS101`, `MATH201`).
* `credits INT CHECK (credits BETWEEN 1 AND 6)`: Ensures course credit weights are reasonable.

---

### Table 5: `enrollments`
This is a **Junction Table** (or bridge table). It tracks which student is enrolled in which course, along with the semester and final grade achieved.

```sql
CREATE TABLE enrollments (
  id SERIAL PRIMARY KEY,
  student_id INT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  course_id INT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  semester VARCHAR(20) NOT NULL,
  grade VARCHAR(2),
  status VARCHAR(20) DEFAULT 'enrolled' CHECK (status IN ('enrolled', 'completed', 'dropped')),
  UNIQUE (student_id, course_id, semester)
);
```

#### Keyword Explanations:
* `ON DELETE CASCADE`: If a student or course is deleted, their related enrollment rows are automatically cleaned up.
* `CHECK (status IN ('enrolled', 'completed', 'dropped'))`: Restricts the status to only these three allowed states.
* `UNIQUE (student_id, course_id, semester)`: Prevents a student from being accidentally enrolled twice in the exact same course during the same semester.

---

### Verify Table Creation
Run the meta-command to check your newly created tables:

```sql
\dt
```

**Expected Output:**
```text
               List of relations
 Schema |    Name     | Type  |  Owner   
--------+-------------+-------+----------
 public | courses     | table | postgres
 public | departments | table | postgres
 public | enrollments | table | postgres
 public | professors  | table | postgres
 public | students    | table | postgres
(5 rows)
```

---

## 4. Step 3: Populating Realistic Sample Data

Now let's insert rich, realistic sample data so we can run meaningful queries.

### 1. Insert Departments
```sql
INSERT INTO departments (name, building, head_of_department) VALUES
  ('Computer Science', 'Turing Hall, Floor 3', 'Dr. Alan Vance'),
  ('Mechanical Engineering', 'Watt Building, Floor 1', 'Dr. Sarah Sterling'),
  ('Electrical Engineering', 'Tesla Complex, Floor 2', 'Dr. Nikola Ray'),
  ('Mathematics', 'Euler Pavilion, Floor 4', 'Dr. Katherine Bell');
```

Verify the insertion:
```sql
SELECT * FROM departments;
```

---

### 2. Insert Professors
```sql
INSERT INTO professors (department_id, full_name, email, salary, hire_date) VALUES
  (1, 'Dr. Marcus Turing', 'marcus.t@apex.edu', 92000.00, '2019-08-15'),
  (1, 'Prof. Elena Rostova', 'elena.r@apex.edu', 87500.00, '2021-01-10'),
  (2, 'Dr. Robert Briggs', 'robert.b@apex.edu', 89000.00, '2018-09-01'),
  (3, 'Prof. Maya Lin', 'maya.l@apex.edu', 91000.00, '2020-03-20'),
  (4, 'Dr. David Gauss', 'david.g@apex.edu', 84000.00, '2022-07-01');
```

---

### 3. Insert Students
```sql
INSERT INTO students (department_id, full_name, email, age, gpa, enrollment_date) VALUES
  (1, 'Liam Smith', 'liam.s@apex.edu', 20, 3.85, '2023-09-01'),
  (1, 'Sophia Chen', 'sophia.c@apex.edu', 19, 3.92, '2024-01-15'),
  (1, 'Lucas Rodriguez', 'lucas.r@apex.edu', 22, 2.75, '2022-09-01'),
  (2, 'Emma Watson', 'emma.w@apex.edu', 21, 3.60, '2023-09-01'),
  (2, 'Noah Kim', 'noah.k@apex.edu', 20, 3.10, '2023-09-01'),
  (3, 'Olivia Davis', 'olivia.d@apex.edu', 23, 3.78, '2022-01-10'),
  (4, 'Ethan Miller', 'ethan.m@apex.edu', 19, 3.45, '2024-09-01'),
  (4, 'Ava Taylor', 'ava.t@apex.edu', 21, 2.90, '2023-01-15');
```

---

### 4. Insert Courses
```sql
INSERT INTO courses (department_id, course_code, course_name, credits) VALUES
  (1, 'CS101', 'Introduction to Computer Science', 4),
  (1, 'CS201', 'Data Structures & Algorithms', 4),
  (1, 'CS301', 'Database Systems & SQL', 3),
  (2, 'ME101', 'Thermodynamics & Heat Transfer', 4),
  (2, 'ME205', 'Solid Mechanics & CAD', 3),
  (3, 'EE101', 'Circuit Theory & Digital Logic', 4),
  (4, 'MATH101', 'Linear Algebra & Matrices', 3),
  (4, 'MATH201', 'Multivariable Calculus', 4);
```

---

### 5. Insert Enrollments
Let's enroll students into courses and record their grades:

```sql
INSERT INTO enrollments (student_id, course_id, semester, grade, status) VALUES
  -- Liam Smith's courses
  (1, 1, 'Fall 2024', 'A', 'completed'),
  (1, 2, 'Spring 2025', 'A', 'completed'),
  (1, 3, 'Fall 2025', NULL, 'enrolled'),

  -- Sophia Chen's courses
  (2, 1, 'Fall 2024', 'A', 'completed'),
  (2, 2, 'Spring 2025', 'A', 'completed'),

  -- Lucas Rodriguez's courses
  (3, 1, 'Fall 2024', 'C', 'completed'),
  (3, 3, 'Spring 2025', 'B', 'completed'),

  -- Emma Watson's courses
  (4, 4, 'Fall 2024', 'A', 'completed'),
  (4, 5, 'Spring 2025', 'B', 'completed'),

  -- Noah Kim's courses
  (5, 4, 'Fall 2024', 'B', 'completed'),

  -- Olivia Davis's courses
  (6, 6, 'Fall 2024', 'A', 'completed'),

  -- Ethan Miller's courses
  (7, 7, 'Fall 2024', 'A', 'completed'),
  (7, 8, 'Spring 2025', 'B', 'completed');
```

---

## 5. Step 4: Real-World College Queries (Hands-On)

Now comes the exciting part! Let's write the exact SQL queries that university administrators, professors, and academic deans execute every single day.

---

### Query 1: The Dean's Honors List (High GPA Students)
**Goal**: The Dean wants a list of all students with a GPA of 3.70 or higher, sorted with the highest GPA at the top.

```sql
SELECT 
  full_name, 
  email, 
  gpa 
FROM students 
WHERE gpa >= 3.70 
ORDER BY gpa DESC;
```

**Output:**
```text
  full_name   |       email       | gpa  
--------------+-------------------+------
 Sophia Chen  | sophia.c@apex.edu | 3.92
 Liam Smith   | liam.s@apex.edu   | 3.85
 Olivia Davis | olivia.d@apex.edu | 3.78
(3 rows)
```

---

### Query 2: Finding Students in a Specific Department
**Goal**: Retrieve the names, ages, and GPAs of all students in Computer Science (`department_id = 1`), who are aged 20 or younger.

```sql
SELECT 
  full_name, 
  age, 
  gpa 
FROM students 
WHERE department_id = 1 AND age <= 20;
```

**Output:**
```text
  full_name  | age | gpa  
-------------+-----+------
 Liam Smith  |  20 | 3.85
 Sophia Chen |  19 | 3.92
(2 rows)
```

---

### Query 3: Searching Students by Name or Email
**Goal**: An advisor types "li" in the search bar. We want a case-insensitive search matching anywhere in the student's name:

```sql
SELECT id, full_name, email 
FROM students 
WHERE full_name ILIKE '%li%';
```

**Output:**
```text
 id |  full_name   |      email       
----+--------------+------------------
  1 | Liam Smith   | liam.s@apex.edu
  6 | Olivia Davis | olivia.d@apex.edu
(2 rows)
```

---

### Query 4: College Overview & Statistics
**Goal**: Calculate total enrolled students, college average GPA, lowest GPA, and highest GPA.

```sql
SELECT 
  COUNT(*) AS total_students,
  ROUND(AVG(gpa), 2) AS average_gpa,
  MIN(gpa) AS lowest_gpa,
  MAX(gpa) AS highest_gpa
FROM students;
```

**Output:**
```text
 total_students | average_gpa | lowest_gpa | highest_gpa 
----------------+-------------+------------+-------------
              8 |        3.42 |       2.75 |        3.92
(1 row)
```

---

### Query 5: Faculty Salary Budget by Department
**Goal**: Show how much each department spends on professor salaries, along with the average salary in that department.

```sql
SELECT 
  departments.name AS department_name,
  COUNT(professors.id) AS faculty_count,
  ROUND(AVG(professors.salary), 2) AS average_salary,
  SUM(professors.salary) AS total_payroll
FROM departments
INNER JOIN professors ON departments.id = professors.department_id
GROUP BY departments.name
ORDER BY total_payroll DESC;
```

**Output:**
```text
    department_name     | faculty_count | average_salary | total_payroll 
------------------------+---------------+----------------+---------------
 Computer Science       |             2 |       89750.00 |     179500.00
 Electrical Engineering |             1 |       91000.00 |      91000.00
 Mechanical Engineering |             1 |       89000.00 |      89000.00
 Mathematics            |             1 |       84000.00 |      84000.00
(4 rows)
```

---

### Query 6: Complete Student Roster with Department Names (Table Join)
**Goal**: Display every student along with the human-readable name of their department and building location:

```sql
SELECT 
  students.id AS student_id,
  students.full_name AS student_name,
  students.gpa,
  departments.name AS department_name,
  departments.building
FROM students
INNER JOIN departments ON students.department_id = departments.id
ORDER BY departments.name ASC, students.gpa DESC;
```

**Output:**
```text
 student_id |  student_name   | gpa  |    department_name     |        building         
------------+-----------------+------+------------------------+-------------------------
          2 | Sophia Chen     | 3.92 | Computer Science       | Turing Hall, Floor 3
          1 | Liam Smith      | 3.85 | Computer Science       | Turing Hall, Floor 3
          3 | Lucas Rodriguez | 2.75 | Computer Science       | Turing Hall, Floor 3
          6 | Olivia Davis    | 3.78 | Electrical Engineering | Tesla Complex, Floor 2
          7 | Ethan Miller    | 3.45 | Mathematics            | Euler Pavilion, Floor 4
          8 | Ava Taylor      | 2.90 | Mathematics            | Euler Pavilion, Floor 4
          4 | Emma Watson     | 3.60 | Mechanical Engineering | Watt Building, Floor 1
          5 | Noah Kim        | 3.10 | Mechanical Engineering | Watt Building, Floor 1
(8 rows)
```

---

### Query 7: Detailed Student Academic Transcript (3-Table Join)
**Goal**: Connect `students`, `enrollments`, and `courses` to show a comprehensive transcript of all student course results:

```sql
SELECT 
  students.full_name AS student_name,
  courses.course_code,
  courses.course_name,
  courses.credits,
  enrollments.semester,
  COALESCE(enrollments.grade, 'In Progress') AS final_grade,
  enrollments.status
FROM enrollments
INNER JOIN students ON enrollments.student_id = students.id
INNER JOIN courses ON enrollments.course_id = courses.id
ORDER BY students.full_name, courses.course_code;
```

**Output:**
```text
  student_name   | course_code |          course_name           | credits |  semester   | final_grade |   status   
-----------------+-------------+--------------------------------+---------+-------------+-------------+------------
 Emma Watson     | ME101       | Thermodynamics & Heat Transfer |       4 | Fall 2024   | A           | completed
 Emma Watson     | ME205       | Solid Mechanics & CAD          |       3 | Spring 2025 | B           | completed
 Ethan Miller    | MATH101     | Linear Algebra & Matrices      |       3 | Fall 2024   | A           | completed
 Ethan Miller    | MATH201     | Multivariable Calculus         |       4 | Spring 2025 | B           | completed
 Liam Smith      | CS101       | Introduction to Computer Science|       4 | Fall 2024   | A           | completed
 Liam Smith      | CS201       | Data Structures & Algorithms   |       4 | Spring 2025 | A           | completed
 Liam Smith      | CS301       | Database Systems & SQL         |       3 | Fall 2025   | In Progress | enrolled
 Lucas Rodriguez | CS101       | Introduction to Computer Science|       4 | Fall 2024   | C           | completed
 Lucas Rodriguez | CS301       | Database Systems & SQL         |       3 | Spring 2025 | B           | completed
 Noah Kim        | ME101       | Thermodynamics & Heat Transfer |       4 | Fall 2024   | B           | completed
 Olivia Davis    | EE101       | Circuit Theory & Digital Logic |       4 | Fall 2024   | A           | completed
 Sophia Chen     | CS101       | Introduction to Computer Science|       4 | Fall 2024   | A           | completed
 Sophia Chen     | CS201       | Data Structures & Algorithms   |       4 | Spring 2025 | A           | completed
(13 rows)
```

> [!TIP]
> `COALESCE(enrollments.grade, 'In Progress')` replaces `NULL` values with the friendly text `'In Progress'` if a student is currently taking the course!

---

### Query 8: Finding Courses with Zero Enrollments (`LEFT JOIN`)
**Goal**: Check if there are any courses on the syllabus that no student has signed up for yet.

```sql
SELECT 
  courses.course_code,
  courses.course_name,
  COUNT(enrollments.id) AS enrolled_students
FROM courses
LEFT JOIN enrollments ON courses.id = enrollments.course_id
GROUP BY courses.id, courses.course_code, courses.course_name
HAVING COUNT(enrollments.id) = 0;
```

*(If all courses have students, this returns 0 rows. Let's add a brand new course and run it again to see the magic!)*

```sql
-- Add an advanced AI elective course
INSERT INTO courses (department_id, course_code, course_name, credits)
VALUES (1, 'CS450', 'Artificial Intelligence & Neural Networks', 4);

-- Re-run the query
SELECT 
  courses.course_code,
  courses.course_name,
  COUNT(enrollments.id) AS enrolled_students
FROM courses
LEFT JOIN enrollments ON courses.id = enrollments.course_id
GROUP BY courses.id, courses.course_code, courses.course_name
HAVING COUNT(enrollments.id) = 0;
```

**Output:**
```text
 course_code |                course_name                | enrolled_students 
-------------+-------------------------------------------+-------------------
 CS450       | Artificial Intelligence & Neural Networks |                 0
(1 row)
```

---

## 6. Step 5: Updating & Modifying College Records

Data is dynamic. Grades change, faculty get promotions, and students change majors.

### 1. Update a Student's GPA After a Semester
Lucas Rodriguez worked hard in his recent semester. Let's raise his GPA from `2.75` to `3.15`:

```sql
UPDATE students 
SET gpa = 3.15 
WHERE id = 3 
RETURNING id, full_name, gpa;
```

**Output:**
```text
 id |    full_name    | gpa  
----+-----------------+------
  3 | Lucas Rodriguez | 3.15
(1 row)
```

---

### 2. Department-Wide Faculty Salary Raise
The college board approved a 5% inflation salary adjustment for all Computer Science professors (`department_id = 1`):

```sql
UPDATE professors 
SET salary = ROUND(salary * 1.05, 2) 
WHERE department_id = 1 
RETURNING full_name, salary;
```

**Output:**
```text
      full_name      |  salary  
---------------------+----------
 Dr. Marcus Turing   | 96600.00
 Prof. Elena Rostova | 91875.00
(2 rows)
```

---

### 3. Submitting a Final Grade for an Enrolled Student
Liam Smith finished `CS301` with an `'A'`. Let's update his enrollment record from `'enrolled'` to `'completed'`:

```sql
UPDATE enrollments 
SET 
  grade = 'A',
  status = 'completed'
WHERE student_id = 1 AND course_id = 3
RETURNING student_id, course_id, grade, status;
```

---

## 7. Step 6: Safe Record Deletions & Cascade Demonstration

### 1. Removing a Single Course Enrollment
A student decides to drop out of an elective before the deadline:

```sql
-- Remove the enrollment
DELETE FROM enrollments 
WHERE student_id = 3 AND course_id = 3 AND status = 'enrolled'
RETURNING *;
```

---

### 2. The Power of `ON DELETE CASCADE`
Remember when we created `enrollments` with `ON DELETE CASCADE` linked to `students`?

Let's test what happens when a test student leaves the college:

```sql
-- 1. Insert a temporary test student
INSERT INTO students (id, department_id, full_name, email, age, gpa) 
VALUES (999, 1, 'Test Student', 'test@apex.edu', 20, 2.50);

-- 2. Enroll the test student in course 1
INSERT INTO enrollments (student_id, course_id, semester, status) 
VALUES (999, 1, 'Fall 2025', 'enrolled');

-- 3. Delete the student
DELETE FROM students WHERE id = 999;

-- 4. Check if their enrollment still exists:
SELECT * FROM enrollments WHERE student_id = 999;
```

**Output:**
```text
(0 rows)
```
Because of `ON DELETE CASCADE`, PostgreSQL automatically cleaned up the orphaned enrollment record without any manual cleanup required!

---

## 8. Step 7: Creating Reusable Database Views

In a real college portal, the Registrar's Office queries student performance every morning. Instead of writing a complex 3-table join each time, we can save the query as a **View**:

```sql
CREATE OR REPLACE VIEW view_student_transcripts AS
SELECT 
  s.id AS student_id,
  s.full_name AS student_name,
  d.name AS department_name,
  c.course_code,
  c.course_name,
  c.credits,
  e.semester,
  COALESCE(e.grade, 'Pending') AS grade,
  e.status
FROM enrollments e
INNER JOIN students s ON e.student_id = s.id
INNER JOIN departments d ON s.department_id = d.id
INNER JOIN courses c ON e.course_id = c.id;
```

Now, anyone can view transcripts with a single, simple query:

```sql
SELECT * FROM view_student_transcripts 
WHERE student_name = 'Sophia Chen';
```

**Output:**
```text
 student_id | student_name | department_name  | course_code |          course_name          | credits |  semester   | grade |  status   
------------+--------------+------------------+-------------+-------------------------------+---------+-------------+-------+-----------
          2 | Sophia Chen  | Computer Science | CS101       | Introduction to Computer Science|       4 | Fall 2024   | A     | completed
          2 | Sophia Chen  | Computer Science | CS201       | Data Structures & Algorithms  |       4 | Spring 2025 | A     | completed
(2 rows)
```

---

## 9. Complete All-In-One SQL Script

Want to recreate this entire college database in one single execution? Copy and run this complete master script:

```sql
-- =========================================================================
-- APEX INSTITUTE OF TECHNOLOGY - COLLEGE DATABASE SETUP SCRIPT
-- =========================================================================

-- Drop existing tables if restarting
DROP TABLE IF EXISTS enrollments CASCADE;
DROP TABLE IF EXISTS courses CASCADE;
DROP TABLE IF EXISTS students CASCADE;
DROP TABLE IF EXISTS professors CASCADE;
DROP TABLE IF EXISTS departments CASCADE;

-- 1. Create Tables
CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  building VARCHAR(50) NOT NULL,
  head_of_department VARCHAR(100)
);

CREATE TABLE professors (
  id SERIAL PRIMARY KEY,
  department_id INT NOT NULL REFERENCES departments(id) ON DELETE RESTRICT,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  salary NUMERIC(10, 2) NOT NULL CHECK (salary > 0),
  hire_date DATE DEFAULT CURRENT_DATE
);

CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  department_id INT NOT NULL REFERENCES departments(id) ON DELETE RESTRICT,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  age INT NOT NULL CHECK (age >= 16),
  gpa NUMERIC(3, 2) DEFAULT 0.00 CHECK (gpa >= 0.00 AND gpa <= 4.00),
  enrollment_date DATE DEFAULT CURRENT_DATE
);

CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  department_id INT NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
  course_code VARCHAR(10) NOT NULL UNIQUE,
  course_name VARCHAR(100) NOT NULL,
  credits INT NOT NULL CHECK (credits BETWEEN 1 AND 6)
);

CREATE TABLE enrollments (
  id SERIAL PRIMARY KEY,
  student_id INT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  course_id INT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  semester VARCHAR(20) NOT NULL,
  grade VARCHAR(2),
  status VARCHAR(20) DEFAULT 'enrolled' CHECK (status IN ('enrolled', 'completed', 'dropped')),
  UNIQUE (student_id, course_id, semester)
);

-- 2. Populate Data
INSERT INTO departments (name, building, head_of_department) VALUES
  ('Computer Science', 'Turing Hall, Floor 3', 'Dr. Alan Vance'),
  ('Mechanical Engineering', 'Watt Building, Floor 1', 'Dr. Sarah Sterling'),
  ('Electrical Engineering', 'Tesla Complex, Floor 2', 'Dr. Nikola Ray'),
  ('Mathematics', 'Euler Pavilion, Floor 4', 'Dr. Katherine Bell');

INSERT INTO professors (department_id, full_name, email, salary, hire_date) VALUES
  (1, 'Dr. Marcus Turing', 'marcus.t@apex.edu', 92000.00, '2019-08-15'),
  (1, 'Prof. Elena Rostova', 'elena.r@apex.edu', 87500.00, '2021-01-10'),
  (2, 'Dr. Robert Briggs', 'robert.b@apex.edu', 89000.00, '2018-09-01'),
  (3, 'Prof. Maya Lin', 'maya.l@apex.edu', 91000.00, '2020-03-20'),
  (4, 'Dr. David Gauss', 'david.g@apex.edu', 84000.00, '2022-07-01');

INSERT INTO students (department_id, full_name, email, age, gpa, enrollment_date) VALUES
  (1, 'Liam Smith', 'liam.s@apex.edu', 20, 3.85, '2023-09-01'),
  (1, 'Sophia Chen', 'sophia.c@apex.edu', 19, 3.92, '2024-01-15'),
  (1, 'Lucas Rodriguez', 'lucas.r@apex.edu', 22, 2.75, '2022-09-01'),
  (2, 'Emma Watson', 'emma.w@apex.edu', 21, 3.60, '2023-09-01'),
  (2, 'Noah Kim', 'noah.k@apex.edu', 20, 3.10, '2023-09-01'),
  (3, 'Olivia Davis', 'olivia.d@apex.edu', 23, 3.78, '2022-01-10'),
  (4, 'Ethan Miller', 'ethan.m@apex.edu', 19, 3.45, '2024-09-01'),
  (4, 'Ava Taylor', 'ava.t@apex.edu', 21, 2.90, '2023-01-15');

INSERT INTO courses (department_id, course_code, course_name, credits) VALUES
  (1, 'CS101', 'Introduction to Computer Science', 4),
  (1, 'CS201', 'Data Structures & Algorithms', 4),
  (1, 'CS301', 'Database Systems & SQL', 3),
  (2, 'ME101', 'Thermodynamics & Heat Transfer', 4),
  (2, 'ME205', 'Solid Mechanics & CAD', 3),
  (3, 'EE101', 'Circuit Theory & Digital Logic', 4),
  (4, 'MATH101', 'Linear Algebra & Matrices', 3),
  (4, 'MATH201', 'Multivariable Calculus', 4);

INSERT INTO enrollments (student_id, course_id, semester, grade, status) VALUES
  (1, 1, 'Fall 2024', 'A', 'completed'),
  (1, 2, 'Spring 2025', 'A', 'completed'),
  (1, 3, 'Fall 2025', NULL, 'enrolled'),
  (2, 1, 'Fall 2024', 'A', 'completed'),
  (2, 2, 'Spring 2025', 'A', 'completed'),
  (3, 1, 'Fall 2024', 'C', 'completed'),
  (3, 3, 'Spring 2025', 'B', 'completed'),
  (4, 4, 'Fall 2024', 'A', 'completed'),
  (4, 5, 'Spring 2025', 'B', 'completed'),
  (5, 4, 'Fall 2024', 'B', 'completed'),
  (6, 6, 'Fall 2024', 'A', 'completed'),
  (7, 7, 'Fall 2024', 'A', 'completed'),
  (7, 8, 'Spring 2025', 'B', 'completed');
```

---

## 10. Summary of What You Achieved

Congratulations! By completing this hands-on project, you have acquired real engineering database skills:
* **Database Architecture**: Designed a clean 5-table relational schema with primary and foreign keys.
* **Integrity Constraints**: Enforced business rules with `CHECK`, `NOT NULL`, and `UNIQUE`.
* **Data Ingestion**: Populated tables with batch inserts.
* **Analytical Queries**: Filtered with `WHERE`, sorted with `ORDER BY`, and aggregated metrics with `GROUP BY` and `AVG`.
* **Relational Joins**: Joined up to 3 tables simultaneously to generate real-time student transcripts.
* **Lifecycle Management**: Updated records, performed conditional modifications, and saw cascading deletes in action.
* **Views**: Created reusable abstractions for high-frequency reports.

---

### Ready for Backend Integration?
Connect PostgreSQL to an Express server and build a real user authentication system:

👉 **[Go to Hands-On Guide: Node.js, Express & Sequelize with PostgreSQL in Docker](./sequelize-express-guide.md)** — Master database configuration, model definitions, Sequelize CRUD operations, and build a full Login & Signup REST API!

