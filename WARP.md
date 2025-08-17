# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is the "Tripleten web_project_api_full" repository - currently a minimal setup ready for full-stack web API development.

## Repository Status

This repository is in an initial state with only a README.md file. The project structure and development toolchain are not yet established.

## Development Setup Considerations

Since this repository is starting fresh, consider these common patterns for web API projects:

### Potential Project Types
- **Node.js/Express**: `npm init`, add package.json with scripts
- **Python/Django or Flask**: `pip install`, requirements.txt, virtual environment
- **Python/FastAPI**: Modern async API framework
- **Go**: `go mod init`, structured Go modules
- **Rust/Axum**: `cargo init`, Cargo.toml configuration

### Common Development Commands (to be established)

Once the project structure is defined, typical commands might include:
```bash
# Installation
npm install          # Node.js
pip install -r requirements.txt  # Python
go mod download      # Go
cargo build          # Rust

# Development server
npm run dev          # Node.js
python manage.py runserver  # Django
uvicorn main:app --reload   # FastAPI
go run main.go       # Go
cargo run            # Rust

# Testing
npm test             # Node.js
pytest               # Python
go test ./...        # Go
cargo test           # Rust

# Linting/Formatting
npm run lint         # Node.js
flake8 . && black .  # Python
golangci-lint run    # Go
cargo clippy         # Rust
```

## Architecture Guidance

When developing the API structure, consider:

### API Design Patterns
- RESTful endpoints with proper HTTP methods
- Consistent response formatting (JSON)
- Error handling middleware
- Authentication/authorization layers
- Database connection and ORM/query layer
- Environment-based configuration

### Project Structure Suggestions
```
/
├── src/ or app/          # Main application code
├── tests/                # Test files
├── docs/                 # API documentation
├── scripts/              # Build/deployment scripts
├── config/               # Configuration files
└── README.md             # Project documentation
```

## Next Steps

1. Choose and initialize your preferred web framework
2. Set up package management (package.json, requirements.txt, etc.)
3. Establish development scripts and build processes
4. Update this WARP.md file with specific commands and architecture details

## Git Workflow

- Main branch: `main`
- Remote: `git@github.com:Jmarce12/web_project_api_full.git`
- Current state: Initial commit only
