# 100 Core DBMS & SQL Interview Questions

> A comprehensive, beginner-to-intermediate question bank covering Database Management Systems (DBMS), Relational Models, Keys, Normalization, ACID Transactions, Concurrency Control, Indexing, and SQL Queries for freshers and product engineers.

---

## 📑 Index & Topic Breakdown

| Section | Range | Topics Covered |
| :--- | :--- | :--- |
| **[Part 1: Core Fundamentals & Relational Architecture](#part-1-core-fundamentals--relational-architecture-q1--q30)** | Q1 – Q30 | DBMS vs File System, 3-Schema Architecture, Data Independence, Keys (Primary, Foreign, Candidate), Constraints, ER Modeling, DDL/DML/DCL/TCL |
| **[Part 2: Normalization & Schema Design](#part-2-normalization--schema-design-q31--q50)** | Q31 – Q50 | Data Anomalies, Functional Dependencies, 1NF, 2NF, 3NF, BCNF, 4NF, Denormalization, Lossless Decomposition, Views |
| **[Part 3: Transactions, Concurrency & ACID Properties](#part-3-transactions-concurrency--acid-properties-q51--q75)** | Q51 – Q75 | ACID properties, Serializability, Dirty Read, Phantom Read, Isolation Levels, 2PL, Deadlocks, Write-Ahead Logging (WAL), Checkpoints |
| **[Part 4: SQL Queries, Indexing & Architecture](#part-4-sql-queries-indexing--architecture-q76--q100)** | Q76 – Q100 | B+ Tree Indexing, Clustered vs Non-Clustered, Joins, Window Functions, Stored Procedures, Triggers, NoSQL vs SQL, CAP Theorem, Sharding |

---

# Part 1: Core Fundamentals & Relational Architecture (Q1 – Q30)

### Q1: What is a Database and what is a Database Management System (DBMS)?
**Answer:**
* **Database**: An organized, structured collection of interrelated data stored electronically for efficient access, management, and updates.
* **DBMS**: Software that interacts with end users, applications, and the database itself to capture, query, and analyze data (e.g., PostgreSQL, MySQL, Oracle, SQLite). It provides tools for data definition, manipulation, security, and concurrency.

---

### Q2: What are the differences between a File Processing System and a DBMS?
**Answer:**
| Feature | File System | DBMS |
| :--- | :--- | :--- |
| **Data Redundancy** | High; identical data is duplicated across files | Low; minimized via normalization |
| **Data Consistency** | Prone to inconsistencies when updates occur | Maintained automatically via integrity constraints |
| **Data Access** | Requires custom code to search and read files | Standardized via declarative SQL queries |
| **Concurrency** | Difficult to lock records safely; risk of lost updates | Robust locking and multi-version concurrency control |
| **Crash Recovery** | Weak; interrupted writes can corrupt files | Strong; ACID guarantees, WAL logs, checkpoints |

---

### Q3: What is an RDBMS and how does it differ from a DBMS?
**Answer:** An **RDBMS (Relational Database Management System)** is a specialized DBMS based on Edgar F. Codd's relational model. Data is stored in 2D tables (relations) consisting of rows (tuples) and columns (attributes), and relationships between tables are maintained using Primary and Foreign Keys. Traditional DBMS includes hierarchical and file-based systems that do not enforce tabular relationships.

---

### Q4: Explain the 3-Schema Architecture (ANSI/SPARC Architecture).
**Answer:** A framework that separates the user view from the physical storage:
1. **Physical Level (Internal Schema)**: Describes how data is physically stored on disk (block layout, B-Tree indexes, hashing, compression).
2. **Conceptual Level (Logical Schema)**: Describes what data is stored and the relationships between entities (tables, columns, data types, constraints).
3. **External Level (View Schema)**: The user/application view. Different user groups see customized subsets of data (e.g., HR view vs Accounting view).

```text
  [ User 1 (View 1) ]       [ User 2 (View 2) ]   <-- External Level
             \                     /
              v                   v
            [ Conceptual / Logical Schema ]       <-- What data is stored
                           |
                           v
            [ Internal / Physical Schema ]        <-- How data is stored on disk
```

---

### Q5: What is Data Independence?
**Answer:** The capacity to modify a schema at one level of the database architecture without altering the schema at the next higher level:
* **Physical Data Independence**: The ability to modify physical storage structures (e.g., adding an index, moving to SSDs) without altering conceptual schemas or application code.
* **Logical Data Independence**: The ability to change the conceptual schema (e.g., adding a new column or table) without breaking existing external views or user queries. Logical independence is harder to achieve than physical.

---

### Q6: What is the difference between a Database Schema and a Database Instance?
**Answer:**
* **Schema**: The blueprint or overall structural design of the database (table names, column types, constraints). It is defined once and changes infrequently.
* **Instance**: The actual collection of data stored in the database at a specific moment in time (the snapshot). It changes constantly as rows are inserted, updated, and deleted.

---

### Q7: What is an Entity-Relationship (ER) Model?
**Answer:** A high-level conceptual data model that visually represents real-world entities and their associations using ER Diagrams:
* **Entity**: A real-world object distinguishable from others (represented by a **Rectangle**, e.g., `Student`).
* **Attribute**: A property or characteristic of an entity (represented by an **Oval**, e.g., `Student_Name`).
* **Relationship**: An association among two or more entities (represented by a **Diamond**, e.g., `Enrolls_In`).

---

### Q8: What are Strong Entities and Weak Entities?
**Answer:**
* **Strong Entity**: Has its own Primary Key and can exist independently (e.g., `Employee` with `Emp_ID`). Represented by a single rectangle.
* **Weak Entity**: Cannot be uniquely identified by its own attributes alone and depends on a strong entity (owner entity) via a foreign key. It has a partial key (discriminator). Represented by a double rectangle (e.g., `Dependent` of an Employee).

---

### Q9: List and explain the different types of Attributes in an ER Model.
**Answer:**
1. **Simple Attribute**: Atomic; cannot be divided (e.g., `Age`).
2. **Composite Attribute**: Can be subdivided into smaller sub-parts (e.g., `Name` into `First_Name` and `Last_Name`).
3. **Single-Valued Attribute**: Holds one value per entity (e.g., `Date_of_Birth`).
4. **Multi-Valued Attribute**: Can hold multiple values for an entity (e.g., `Phone_Numbers`, represented by a double oval).
5. **Derived Attribute**: Value calculated from another attribute (e.g., `Age` calculated from `DOB`, represented by a dashed oval).
6. **Key Attribute**: Uniquely identifies an entity (underlined text, e.g., `<u>Student_ID</u>`).

---

### Q10: What is Cardinality (Mapping Constraints) in relationships?
**Answer:** Specifies how many instances of an entity can be associated with instances of another entity:
* **One-to-One (1:1)**: E.g., One citizen has one passport.
* **One-to-Many (1:N)**: E.g., One department has many employees.
* **Many-to-Many (N:M)**: E.g., Students enroll in many courses; courses have many students.

---

### Q11: What is Total Participation vs Partial Participation?
**Answer:**
* **Total Participation (Existence Dependency)**: Every entity in the set MUST participate in the relationship (represented by a double line). E.g., Every `Loan` must belong to a `Customer`.
* **Partial Participation**: Only some entities participate. E.g., Not every `Employee` manages a `Department`.

---

### Q12: Define Primary Key, Candidate Key, and Super Key.
**Answer:**
* **Super Key**: A set of one or more attributes that collectively identify a tuple uniquely in a relation.
* **Candidate Key**: A **minimal** Super Key with no redundant attributes. A table can have multiple Candidate Keys.
* **Primary Key**: The specific Candidate Key chosen by the database architect to uniquely identify rows in a table. It cannot contain `NULL` values.

---

### Q13: What is an Alternate Key (Secondary Key)?
**Answer:** Any Candidate Key that was **not** selected as the Primary Key. For example, if a table has `Student_ID` and `Email` as candidate keys and `Student_ID` becomes the Primary Key, `Email` is the Alternate Key.

---

### Q14: What is a Composite Key?
**Answer:** A Primary Key composed of two or more columns that together guarantee uniqueness (e.g., `OrderID` + `ProductID` in an `OrderItems` table).

---

### Q15: What is a Foreign Key?
**Answer:** A column (or set of columns) in one table that references the Primary Key of another table, establishing a relationship and enforcing **Referential Integrity**.

---

### Q16: What is the difference between a Primary Key and a Unique Key?
**Answer:**
| Feature | Primary Key | Unique Key |
| :--- | :--- | :--- |
| **Nullability** | Cannot accept `NULL` values (`NOT NULL`) | Allows `NULL` (typically one or multiple depending on SQL dialect) |
| **Quantity** | Exactly one Primary Key per table | Multiple Unique keys allowed per table |
| **Clustered Index** | Automatically creates a Clustered Index by default | Automatically creates a Non-Clustered Index by default |

---

### Q17: What are the main Integrity Constraints in RDBMS?
**Answer:**
1. **Domain Integrity**: Attribute values must adhere to their defined data type, format, and check constraints (e.g., `Age > 0`).
2. **Entity Integrity**: The Primary Key must be unique and cannot be `NULL`.
3. **Referential Integrity**: A foreign key value must match an existing primary key in the referenced table or be `NULL`.
4. **Key Integrity**: Enforces uniqueness across candidate keys.

---

### Q18: What are `ON DELETE CASCADE` and `ON DELETE SET NULL`?
**Answer:** Actions taken when a referenced parent row is deleted:
* **`CASCADE`**: Automatically deletes all child rows referencing the deleted parent.
* **`SET NULL`**: Sets the foreign key column in child rows to `NULL`.
* **`RESTRICT / NO ACTION`**: Rejects the deletion of the parent if dependent children exist.

---

### Q19: What is a Surrogate Key vs a Natural Key?
**Answer:**
* **Natural Key**: A key formed from real-world business attributes (e.g., SSN, Passport Number, Email).
* **Surrogate Key**: An artificial, system-generated identifier with no business meaning (e.g., auto-incrementing integer `id SERIAL` or UUID).

---

### Q20: Categorize SQL commands into DDL, DML, DCL, and TCL.
**Answer:**
* **DDL (Data Definition Language)**: Defines and modifies database structure (`CREATE`, `ALTER`, `DROP`, `TRUNCATE`, `RENAME`).
* **DML (Data Manipulation Language)**: Manages and queries data within tables (`SELECT`, `INSERT`, `UPDATE`, `DELETE`).
* **DCL (Data Control Language)**: Manages user privileges and permissions (`GRANT`, `REVOKE`).
* **TCL (Transaction Control Language)**: Manages transactions (`COMMIT`, `ROLLBACK`, `SAVEPOINT`).

---

### Q21: What is the difference between `DROP` and `TRUNCATE`?
**Answer:**
* **`DROP` (DDL)**: Deletes the entire table structure and its data from the database catalog. Frees storage space completely. Cannot be rolled back.
* **`TRUNCATE` (DDL)**: Deletes all rows from a table while preserving the table schema and column definitions. Faster than `DELETE` because it deallocates data pages instead of logging row-by-row deletions.

---

### Q22: What is the difference between `DELETE` and `TRUNCATE`?
**Answer:**
| Feature | `DELETE` | `TRUNCATE` |
| :--- | :--- | :--- |
| **Command Type** | DML | DDL |
| **WHERE Clause** | Supported; can delete specific rows | Not supported; deletes all rows |
| **Performance** | Slower; logs each deleted row in transaction log | Extremely fast; deallocates entire data pages |
| **Triggers** | Fires `ON DELETE` triggers | Does not fire delete triggers |
| **Rollback** | Can be rolled back inside an active transaction | Cannot be rolled back in most engines (or restricted) |

---

### Q23: What is the difference between `NULL`, `0`, and an Empty String `""`?
**Answer:**
* **`NULL`**: Represents the total absence of a value or an unknown/missing state. It does not equal zero or space, and checking it requires `IS NULL` instead of `= NULL`.
* **`0`**: A known integer value of zero.
* **`""`**: A known string value of zero length.

---

### Q24: What is the purpose of the `SAVEPOINT` command?
**Answer:** Creates intermediate checkpoints inside a transaction. If an error occurs, the transaction can roll back to the specific savepoint (`ROLLBACK TO savepoint_name`) without canceling all previous successful operations in the transaction.

---

### Q25: What is the difference between `CHAR` and `VARCHAR`?
**Answer:**
* **`CHAR(n)`**: Fixed length. If a string has fewer than `n` characters, it is right-padded with blank spaces. Takes `n` bytes of storage regardless of content.
* **`VARCHAR(n)`**: Variable length. Only stores the actual characters plus 1-2 prefix bytes recording the length, saving disk space.

---

### Q26: What is a View and why is it used?
**Answer:** A View is a virtual table based on the result-set of an underlying SQL query. It does not store physical data on disk (unless materialized).
**Benefits:**
1. **Security**: Restricts user access to specific rows and columns.
2. **Simplicity**: Hides complex multi-table joins behind a single virtual table name.
3. **Consistency**: Provides a stable interface even if underlying tables are refactored.

---

### Q27: What is the difference between a View and a Materialized View?
**Answer:**
* **Standard View**: Runs the underlying query dynamically every time the view is accessed. Consumes no disk storage.
* **Materialized View**: Executes the query and physically stores the resulting rows on disk. Offers ultra-fast read performance, but requires periodic refreshes (`REFRESH MATERIALIZED VIEW`) to sync with source data changes.

---

### Q28: What is a Self Join?
**Answer:** A regular join in which a table is joined with itself. Commonly used to represent hierarchical or recursive relationships (e.g., an `Employees` table where `Manager_ID` references `Employee_ID` within the same table).

---

### Q29: What is the `COALESCE()` function?
**Answer:** A built-in SQL function that accepts a list of arguments and returns the first non-NULL value:
```sql
SELECT COALESCE(phone, mobile, 'No Phone') FROM customers;
```

---

### Q30: What is the difference between `UNION` and `UNION ALL`?
**Answer:**
* **`UNION`**: Combines the result sets of two queries and performs an internal sorting pass to eliminate duplicate rows.
* **`UNION ALL`**: Combines the result sets without checking for duplicates, preserving all rows. It is significantly faster than `UNION`.

---

# Part 2: Normalization & Schema Design (Q31 – Q50)

### Q31: What is Normalization?
**Answer:** The systematic process of organizing database tables to reduce data redundancy, eliminate data anomalies, and maintain data integrity by decomposing large, unnormalized tables into smaller, well-structured relations linked by foreign keys.

---

### Q32: What are the three main Data Anomalies?
**Answer:**
1. **Insertion Anomaly**: Unable to insert a record without inserting unrelated extra data (e.g., cannot add a new course without assigning a student to it).
2. **Deletion Anomaly**: Deleting one piece of data causes unintentional loss of other important data (e.g., deleting the last student enrolled in a course inadvertently deletes all course information).
3. **Update Anomaly**: If redundant data is updated in one row but missed in another, the database enters an inconsistent state.

---

### Q33: What is a Functional Dependency?
**Answer:** A constraint between two sets of attributes in a relation. In $X \to Y$ (read: "$X$ functionally determines $Y$"), for every valid instance of $X$, there is exactly one corresponding value of $Y$. $X$ is the **Determinant** and $Y$ is the **Dependent**.

---

### Q34: What is Trivial vs Non-Trivial Functional Dependency?
**Answer:**
* **Trivial**: If $Y$ is a subset of $X$ (e.g., `{RollNo, Name} -> RollNo`). Always holds true.
* **Non-Trivial**: If $Y$ is not a subset of $X$ (e.g., `RollNo -> Name`).

---

### Q35: What is First Normal Form (1NF)?
**Answer:** A relation is in 1NF if:
1. Every attribute value is **atomic** (single, indivisible value per cell).
2. There are no repeating groups or arrays.
3. Every row is uniquely identifiable (has a primary key).

---

### Q36: What is Partial Dependency?
**Answer:** Occurs when a non-prime attribute (an attribute not part of any candidate key) depends on only a **part** of a composite candidate key, rather than the entire key. E.g., in `{StudentID, CourseID} -> CourseName`, `CourseName` depends only on `CourseID`.

---

### Q37: What is Second Normal Form (2NF)?
**Answer:** A relation is in 2NF if:
1. It is already in **1NF**.
2. It has **no partial dependencies** (every non-prime attribute is fully functionally dependent on the whole candidate key). If the primary key is a single column, the table is automatically in 2NF once in 1NF!

---

### Q38: What is Transitive Dependency?
**Answer:** Occurs when a non-prime attribute depends on another non-prime attribute: $A \to B$ and $B \to C$, therefore $A \to C$. E.g., `EmpID -> DeptID` and `DeptID -> DeptName`.

---

### Q39: What is Third Normal Form (3NF)?
**Answer:** A relation is in 3NF if:
1. It is in **2NF**.
2. It has **no transitive dependencies** for non-prime attributes.
Formally, for every non-trivial functional dependency $X \to Y$:
* Either $X$ is a **Super Key**, OR
* $Y$ is a **Prime Attribute** (part of a candidate key).

---

### Q40: What is Boyce-Codd Normal Form (BCNF)?
**Answer:** A stricter version of 3NF (often called 3.5NF). A relation is in BCNF if for every functional dependency $X \to Y$, **$X$ MUST be a Super Key**. Unlike 3NF, BCNF does not allow $Y$ to be a prime attribute if $X$ is not a super key.

---

### Q41: Can you give an example where a table is in 3NF but not in BCNF?
**Answer:** Consider `Student_Advisor(StudentID, Subject, Advisor)` where:
1. `{StudentID, Subject} -> Advisor` (Key)
2. `Advisor -> Subject` (Advisor teaches only one subject)
* In 3NF: For `Advisor -> Subject`, `Subject` is a prime attribute, so it passes 3NF!
* In BCNF: `Advisor` is NOT a super key, so it violates BCNF.

---

### Q42: What is Fourth Normal Form (4NF)?
**Answer:** A relation is in 4NF if it is in BCNF and contains **no multi-valued dependencies** ($X \twoheadrightarrow Y$). Multi-valued dependencies occur when one attribute determines multiple independent values of another attribute (e.g., a teacher having multiple phone numbers and teaching multiple independent subjects in the same table).

---

### Q43: What is Denormalization and when is it used?
**Answer:** The deliberate process of adding redundant data or joining tables back together after normalization. While normalization optimizes for **write integrity**, denormalization optimizes for **read performance** by eliminating expensive SQL joins in read-heavy applications, data warehouses, and reporting dashboards.

---

### Q44: What is Lossless Join Decomposition?
**Answer:** A decomposition of relation $R$ into sub-relations $R_1$ and $R_2$ is lossless if performing a natural join on $R_1$ and $R_2$ reconstructs the exact original relation $R$ without generating spurious (ghost) rows:
$$R_1 \bowtie R_2 = R$$

---

### Q45: What is Dependency Preserving Decomposition?
**Answer:** A decomposition where all original functional dependencies can be verified on the decomposed relations individually without having to compute a join across tables.

---

### Q46: What is a Prime Attribute vs a Non-Prime Attribute?
**Answer:**
* **Prime Attribute**: An attribute that is a member of at least one Candidate Key.
* **Non-Prime Attribute**: An attribute that is not part of any Candidate Key.

---

### Q47: What is an In-Memory Database?
**Answer:** A database management system that relies primarily on main physical memory (RAM) for computer data storage (e.g., **Redis**, **Memcached**) rather than disk drives, offering sub-millisecond query latency.

---

### Q48: What is a Database Migration?
**Answer:** A version-controlled set of scripts that track and apply incremental schema changes (creating tables, altering columns, adding indexes) across different deployment environments (development, staging, production).

---

### Q49: What is an ORM (Object-Relational Mapping)?
**Answer:** Software (like Sequelize, Prisma, Hibernate) that maps database tables to object-oriented programming classes, allowing developers to query and manipulate data using native programming language objects rather than writing raw SQL.

---

### Q50: What is the N+1 Query Problem in ORMs?
**Answer:** A performance anti-pattern where an ORM executes 1 initial query to fetch $N$ parent records, and then executes $N$ additional individual queries to fetch children for each parent (total $N+1$ queries). Solved by **Eager Loading** (e.g., `include` in Sequelize or `JOIN` in SQL).

---

# Part 3: Transactions, Concurrency & ACID Properties (Q51 – Q75)

### Q51: What is a Database Transaction?
**Answer:** A logical unit of work that contains one or more database operations (inserts, updates, reads). A transaction must either complete entirely or be completely undone, ensuring the database remains in a consistent state.

---

### Q52: What are the ACID properties?
**Answer:**
* **A - Atomicity**: "All or nothing". Either all operations in the transaction succeed, or the entire transaction is rolled back.
* **C - Consistency**: The database transitions from one valid state to another, satisfying all schema rules and constraints.
* **I - Isolation**: Concurrent transactions execute without interfering with one another.
* **D - Durability**: Once committed, changes are permanent and survive system crashes or power outages.

---

### Q53: Explain Atomicity with a real-world banking example.
**Answer:** Alice transfers $100 to Bob:
1. Deduct $100 from Alice's account (`UPDATE balance = balance - 100`).
2. Add $100 to Bob's account (`UPDATE balance = balance + 100`).
If the server crashes after step 1, Atomicity ensures the deduction is rolled back so Alice does not lose $100 while Bob receives nothing.

---

### Q54: What are the 5 States of a Transaction?
**Answer:**
1. **Active**: Initial state; transaction is executing operations.
2. **Partially Committed**: Final operation has completed, but changes are not yet flushed to disk.
3. **Committed**: Successfully written to disk; changes are durable.
4. **Failed**: An error occurred or integrity checks failed during execution.
5. **Aborted / Terminated**: Changes rolled back and database restored to prior state.

---

### Q55: What is a Schedule in transaction processing?
**Answer:** The chronological sequence in which operations (read, write, abort, commit) of multiple concurrent transactions are executed.
* **Serial Schedule**: Transactions execute one after another with no interleaving.
* **Non-Serial Schedule**: Operations of concurrent transactions are interleaved.

---

### Q56: What is Conflict Serializability?
**Answer:** A non-serial schedule is conflict serializable if it can be transformed into a serial schedule by swapping non-conflicting concurrent operations. Tested using a **Precedence Graph (Serialization Graph)**: if the graph contains no cycles, the schedule is conflict serializable.

---

### Q57: What makes two operations "Conflicting"?
**Answer:** Two operations conflict if they meet all three conditions:
1. They belong to **different** transactions.
2. They operate on the **same** data item.
3. At least one of the operations is a **Write** (`W(X)`).

---

### Q58: What is a Dirty Read (Read-Uncommitted Anomaly)?
**Answer:** Occurs when Transaction A modifies a row, and Transaction B reads that uncommitted modified data. If Transaction A subsequently aborts and rolls back, Transaction B has operated on data that never officially existed.

---

### Q59: What is a Non-Repeatable Read (Fuzzy Read)?
**Answer:** Occurs when Transaction A reads a row twice, but between the two reads, Transaction B modifies or deletes that row and commits. Transaction A gets two different values for the same row within the same transaction.

---

### Q60: What is a Phantom Read?
**Answer:** Occurs when Transaction A queries a range of rows matching a condition (e.g., `WHERE age > 30`), and Transaction B inserts a new row satisfying that condition and commits. When Transaction A runs the exact same query again, a new "phantom" row appears.

---

### Q61: What is the Lost Update problem?
**Answer:** Occurs when two transactions read the same initial data and both update it based on the read value. The transaction that commits last overwrites the changes of the first transaction without incorporating them.

---

### Q62: Explain the 4 SQL Transaction Isolation Levels.
**Answer:**
| Isolation Level | Dirty Read | Non-Repeatable Read | Phantom Read |
| :--- | :---: | :---: | :---: |
| **Read Uncommitted** | Allowed | Allowed | Allowed |
| **Read Committed** | Prevented | Allowed | Allowed |
| **Repeatable Read** | Prevented | Prevented | Allowed |
| **Serializable** | Prevented | Prevented | Prevented |

---

### Q63: What is a Shared Lock (S) vs an Exclusive Lock (X)?
**Answer:**
* **Shared Lock (S-Lock / Read Lock)**: Acquired for reading data. Multiple transactions can hold shared locks on the same resource concurrently.
* **Exclusive Lock (X-Lock / Write Lock)**: Acquired for writing or modifying data. Only one transaction can hold an exclusive lock, blocking all other read and write locks.

---

### Q64: What is the Two-Phase Locking (2PL) Protocol?
**Answer:** A concurrency control protocol guaranteeing conflict serializability by dividing lock management into two phases:
1. **Growing Phase**: Transaction may acquire new locks, but cannot release any locks.
2. **Shrinking Phase**: Transaction may release locks, but cannot acquire any new locks.

---

### Q65: What is Strict 2PL?
**Answer:** A variation of 2PL where all **Exclusive (X)** locks acquired by a transaction are held until the transaction commits or aborts, preventing dirty reads and cascading rollbacks.

---

### Q66: What is a Deadlock in DBMS?
**Answer:** A condition where two or more transactions are permanently blocked, each waiting for a lock on a resource held by the other:
* Transaction 1 holds Lock A, requests Lock B.
* Transaction 2 holds Lock B, requests Lock A.

---

### Q67: How are Deadlocks handled in modern databases?
**Answer:**
1. **Deadlock Detection**: Database maintains a **Wait-For Graph**. If a directed cycle is detected, the DBMS selects a "victim" transaction and aborts/rolls it back.
2. **Deadlock Prevention**: Using timestamps (`Wait-Die` or `Wound-Wait` schemes).
3. **Lock Timeouts**: Transactions abort if they wait longer than a threshold (e.g., 5 seconds).

---

### Q68: What is Write-Ahead Logging (WAL)?
**Answer:** A technique ensuring Durability (D in ACID). Changes must be written and synced to a non-volatile append-only log file on disk **before** the actual database data pages are updated in buffer memory. If the server crashes, the database replays the log to recover committed transactions.

---

### Q69: What is a Checkpoint in database recovery?
**Answer:** A point in time where the DBMS flushes all dirty data buffers in RAM directly onto disk. During crash recovery, the DBMS only needs to scan the WAL log from the last checkpoint forward, significantly speeding up startup recovery.

---

### Q70: What is Multi-Version Concurrency Control (MVCC)?
**Answer:** A concurrency control mechanism used by PostgreSQL and MySQL (InnoDB) where readers do not block writers, and writers do not block readers. When a row is updated, the DBMS creates a new version of the row with a transaction timestamp. Readers view a consistent snapshot of the data as it was when their query began.

---

### Q71: What is Pessimistic vs Optimistic Locking?
**Answer:**
* **Pessimistic Locking**: Assumes conflicts will happen. Explicitly locks records upfront (`SELECT ... FOR UPDATE`) before modifying.
* **Optimistic Locking**: Assumes conflicts are rare. Does not lock records; instead, checks a `version` number or timestamp column upon updating. If the version changed, the transaction aborts and retries.

---

### Q72: What is Cascading Rollback?
**Answer:** When the failure of one transaction causes a chain reaction of rolling back multiple other concurrent transactions that read its uncommitted data.

---

### Q73: What is a Cascadeless Schedule?
**Answer:** A schedule where transactions are only permitted to read data committed by other transactions, preventing cascading rollbacks.

---

### Q74: What is Shadow Paging?
**Answer:** An alternative recovery technique where two page tables are maintained: a current page table and a shadow page table. Updates are made to new pages; on commit, the current pointer swaps to the new table atomically.

---

### Q75: What is Phantom Deadlock?
**Answer:** A false deadlock detected in distributed database systems caused by communication delays in transmitting local lock wait-for graphs to the central coordinator.

---

# Part 4: SQL Queries, Indexing & Architecture (Q76 – Q100)

### Q76: What is a Database Index?
**Answer:** A separate data structure (usually a B+ Tree) that maintains sorted pointers to rows in a table. It allows the database engine to find specific rows in $O(\log N)$ time instead of scanning every block on disk (Full Table Scan, $O(N)$).

---

### Q77: What is the difference between a Clustered and a Non-Clustered Index?
**Answer:**
| Feature | Clustered Index | Non-Clustered Index |
| :--- | :--- | :--- |
| **Physical Order** | Determines the actual physical order of rows on disk | Separate structure; does not alter physical row order |
| **Quantity** | Exactly **one** per table | Multiple allowed per table |
| **Leaf Nodes** | Contain the actual table row data | Contain pointers / row locators to the data rows |
| **Default** | Created automatically on the Primary Key | Created on columns with `UNIQUE` or manual `CREATE INDEX` |

---

### Q78: Why are B+ Trees used for database indexes instead of Binary Search Trees?
**Answer:**
1. **High Fan-out & Low Height**: B+ Trees have hundreds of children per node, keeping the tree shallow (3-4 levels deep even for millions of rows), minimizing expensive disk I/O seeks.
2. **Linked Leaf Nodes**: All data pointers reside in leaf nodes, which are linked as a doubly-linked list, enabling ultra-fast range queries (`BETWEEN`, `>`, `<`).

---

### Q79: When should you NOT index a column?
**Answer:**
1. Tables with very few rows (table scan in memory is faster).
2. Columns that are frequently updated (indexes incur write penalties).
3. Columns with low cardinality (e.g., boolean `true/false` or `gender`).
4. Columns that are rarely referenced in `WHERE`, `JOIN`, or `ORDER BY` clauses.

---

### Q80: What is a Covering Index?
**Answer:** An index that includes all the columns requested in a query's `SELECT`, `WHERE`, and `JOIN` clauses. The DBMS satisfies the entire query directly from index memory without visiting the underlying table pages (Zero Heap Lookups).

---

### Q81: What is the difference between `WHERE` and `HAVING`?
**Answer:**
* **`WHERE`**: Filters individual rows **before** any grouping occurs. Cannot contain aggregate functions.
* **`HAVING`**: Filters summarized groups **after** the `GROUP BY` clause has aggregated rows. Can evaluate aggregates (`HAVING COUNT(*) > 5`).

---

### Q82: Explain all major SQL Joins.
**Answer:**
* **INNER JOIN**: Returns only rows with matching values in both tables.
* **LEFT (OUTER) JOIN**: Returns all rows from the left table and matched rows from the right table (unmatched right columns return `NULL`).
* **RIGHT (OUTER) JOIN**: Returns all rows from the right table and matched rows from the left table.
* **FULL (OUTER) JOIN**: Returns rows when there is a match in either table.
* **CROSS JOIN**: Returns the Cartesian product (every row from table A paired with every row from table B).

---

### Q83: How do `ROW_NUMBER()`, `RANK()`, and `DENSE_RANK()` differ?
**Answer:** Given scores `[100, 90, 90, 80]`:
* **`ROW_NUMBER()`**: Unique consecutive numbers: `1, 2, 3, 4`.
* **`RANK()`**: Same rank for ties, skips subsequent rank: `1, 2, 2, 4`.
* **`DENSE_RANK()`**: Same rank for ties, does not skip: `1, 2, 2, 3`.

---

### Q84: What is a Correlated Subquery?
**Answer:** A subquery that references columns from the outer query. It cannot execute independently and must be evaluated repeatedly for every row processed by the outer query:
```sql
SELECT e.name FROM employees e
WHERE e.salary > (SELECT AVG(salary) FROM employees WHERE dept_id = e.dept_id);
```

---

### Q85: What is the difference between `EXISTS` and `IN`?
**Answer:**
* **`EXISTS`**: Returns a boolean `true` as soon as the first matching row is found in the subquery (short-circuit evaluation). Ideal for large subquery datasets.
* **`IN`**: Evaluates all results from the subquery into a list in memory and checks for membership. Faster for small, static lists.

---

### Q86: Write an SQL query to find the 2nd highest salary in an `employees` table.
**Answer:**
```sql
SELECT MAX(salary) AS SecondHighestSalary
FROM employees
WHERE salary < (SELECT MAX(salary) FROM employees);
```
Or using `DENSE_RANK()`:
```sql
WITH RankedSalaries AS (
  SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) as rnk
  FROM employees
)
SELECT salary FROM RankedSalaries WHERE rnk = 2 LIMIT 1;
```

---

### Q87: Write an SQL query to find duplicate emails in a `users` table.
**Answer:**
```sql
SELECT email, COUNT(email)
FROM users
GROUP BY email
HAVING COUNT(email) > 1;
```

---

### Q88: What is a Stored Procedure?
**Answer:** A prepared SQL code block saved in the database catalog that can accept input/output parameters, contain control-flow logic (IF, WHILE), and be executed with `CALL procedure_name()`. Reduces network latency by running complex logic directly on the DB server.

---

### Q89: What is a Database Trigger?
**Answer:** A stored routine that automatically executes (fires) in response to a specific event (such as `BEFORE INSERT`, `AFTER UPDATE`, or `AFTER DELETE`) on a table.

---

### Q90: What is the difference between SQL (Relational) and NoSQL (Non-Relational)?
**Answer:**
| Feature | SQL / RDBMS | NoSQL |
| :--- | :--- | :--- |
| **Schema** | Rigid, predefined schema | Dynamic, flexible schema |
| **Scaling** | Primarily Vertical (more CPU/RAM) | Horizontal (sharding across clusters) |
| **Transactions** | Strict ACID guarantees | Typically BASE (Eventual Consistency) |
| **Data Structure** | Structured Tables with Rows & Columns | JSON Documents, Key-Value, Graphs |

---

### Q91: What are the 4 main types of NoSQL Databases?
**Answer:**
1. **Document Stores**: Data stored in JSON/BSON documents (e.g., **MongoDB**, CouchDB).
2. **Key-Value Stores**: Super-fast dictionary lookup by key (e.g., **Redis**, DynamoDB).
3. **Columnar Stores**: Data organized by columns for analytical aggregation (e.g., **Cassandra**, BigQuery).
4. **Graph Databases**: Stores nodes and relationships (edges) for networks (e.g., **Neo4j**).

---

### Q92: What is the CAP Theorem?
**Answer:** In a distributed data store, it is impossible to simultaneously guarantee all three of:
* **C - Consistency**: Every read receives the most recent write or an error.
* **A - Availability**: Every non-failing node returns a response (without guarantee that it contains the latest write).
* **P - Partition Tolerance**: The system continues to operate despite arbitrary network message drops between nodes.
*A distributed system must choose between **CP** (e.g., MongoDB, HBase) and **AP** (e.g., Cassandra, CouchDB) during network partitions.*

---

### Q93: What is Database Sharding?
**Answer:** A horizontal scaling technique that partitions a single dataset across multiple physical database server instances. Each partition is called a **shard** and holds a unique subset of rows based on a **Shard Key** (e.g., users with IDs 1-100k on Server A, 100k-200k on Server B).

---

### Q94: What is the difference between Horizontal and Vertical Partitioning?
**Answer:**
* **Horizontal Partitioning (Sharding)**: Splits rows into separate tables or disks based on a range (e.g., partitioning `orders` by year: `orders_2025`, `orders_2026`).
* **Vertical Partitioning**: Splits columns into separate tables (e.g., keeping frequently accessed `user_profile` separate from rarely accessed `user_biography_text`).

---

### Q95: What is Database Replication?
**Answer:** Copying data continuously from one database server (**Primary / Leader**) to one or more secondary servers (**Replicas / Followers**). Read queries are routed to replicas to distribute traffic, while writes go to the primary.

---

### Q96: What is Connection Pooling and why is it essential?
**Answer:** Establishing a new TCP connection to a database has significant CPU and network handshake overhead. A **Connection Pool** maintains a cache of open database connections that are borrowed by application threads and returned after query completion rather than opened and closed repeatedly.

---

### Q97: What is `EXPLAIN ANALYZE` in SQL?
**Answer:** A command that outputs the database engine's **Query Execution Plan**. It reveals whether the query used an index (`Index Scan`) or searched every row on disk (`Sequential Scan`), showing exact execution cost and execution time.

---

### Q98: What is a Common Table Expression (CTE)?
**Answer:** A temporary named result set defined using the `WITH` clause that exists only within the execution scope of a single query, improving readability over complex nested subqueries:
```sql
WITH HighEarners AS (
  SELECT * FROM employees WHERE salary > 100000
)
SELECT department, COUNT(*) FROM HighEarners GROUP BY department;
```

---

### Q99: What is the difference between Optimistic Concurrency Control and Locking?
**Answer:** Locking prevents concurrent access to records physically during execution. Optimistic Concurrency Control allows transactions to execute without locking, checking for conflicts only at the moment of commit; if another transaction modified the data, the current transaction is aborted.

---

### Q100: What is Point-In-Time Recovery (PITR)?
**Answer:** The process of restoring a database to the exact millisecond before an accidental failure or human error (like an accidental `DROP TABLE`) occurred, achieved by restoring the last full backup and rolling forward all Write-Ahead Logs (WAL) up to that exact timestamp.
