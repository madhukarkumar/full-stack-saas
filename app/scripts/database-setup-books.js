const { readFileSync } = require("fs");
const path = require("path");

const { ObjectId, createEleganceServerClient } = require("@singlestore/elegance-sdk/server");

// Database connection configuration
const dbConfig = {
  host: "svc-291ecb7f-d2d2-4243-ac62-8219b36fada0-dml.aws-oregon-3.svc.singlestore.com", // Replace with your MySQL host
  user: "admin", // Replace with your MySQL username
  password: "SingleStore2024", // Replace with your MySQL password
  database: "mkstartupupvote" // Replace with your MySQL database name
};

function withDirname(metaUrl, relativePath) {
  return path.join(__dirname, relativePath);
}

function createBook(book) {
  return {
    id: book.id || new ObjectId().toString(),
    title: book.title,
    description: book.description,
    content: book.content,
    author: book.author,
    rating: book.rating,
    reviews: book.reviews,
    embeddingCollectionName: book.embeddingCollectionName,
    createdAt: book.createdAt || new Date().toISOString(),
    subjects: book.subjects || []
  };
}

async function main() {
  const datasetPaths = {
    books: withDirname(__filename, "../datasets/books.json"),
    booksWithContentEmbeddings: withDirname(__filename, "../datasets/booksWithContentEmbeddings.json")
  };

  const datasets = {};

  for (const [name, path] of Object.entries(datasetPaths)) {
    try {
      datasets[name] = JSON.parse(readFileSync(path, "utf-8"));
    } catch (error) {
      console.error(`Error reading ${name} dataset:`, error.message);
      datasets[name] = [];
    }
  }

  const booksWithEmbeddings = datasets.booksWithContentEmbeddings.map(book => createBook(book));

  const books = [...datasets.books, ...booksWithEmbeddings].map(({ content, embeddings, ...book }) => createBook(book));

  await mysqlSetup();

  async function mysqlSetup() {
    const mysqlEleganceServerClient = createEleganceServerClient("mysql", {
      connection: dbConfig,
      openai: {
        apiKey: "your_openai_api_key" // Replace with your OpenAI API key if needed
      }
    });

    const { connection } = mysqlEleganceServerClient;
    const { tablePath } = connection;

    await createBooksTable();
    await insertBooksData();
    console.log("MySQL: The books table setup is complete.");

    async function createBooksTable() {
      console.log("MySQL: Creating books table if it doesn't exist...");

      await connection.query(`CREATE TABLE IF NOT EXISTS ${tablePath("books")} (
        id VARCHAR(255) PRIMARY KEY,
        title VARCHAR(1000) NOT NULL,
        description TEXT,
        content TEXT,
        author VARCHAR(255) NOT NULL,
        rating DECIMAL(3, 1) NOT NULL,
        reviews INT NOT NULL,
        embeddingCollectionName VARCHAR(255) NOT NULL,
        createdAt VARCHAR(255) NOT NULL,
        subjects TEXT
      )`);
    }

    async function insertBooksData() {
      console.log("MySQL: Inserting books...");

      const mysqlBooks = books.map(({ embeddings, subjects, ...book }) => ({
        ...book,
        subjects: subjects.join(", ")
      }));

      // Using INSERT IGNORE to skip duplicates based on primary key (id)
      await connection.query(
        `INSERT IGNORE INTO ${tablePath("books")} (${Object.keys(mysqlBooks[0]).join(", ")}) VALUES ?`,
        [mysqlBooks.map(Object.values)]
      );

      console.log(`MySQL: Inserted ${mysqlBooks.length} books (skipping any existing duplicates).`);
    }
  }

  process.exit(0);
}

main().catch(error => {
  console.error("An error occurred:", error);
  process.exit(1);
});