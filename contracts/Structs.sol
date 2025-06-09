// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

// Structs
contract Structs1 {
	struct Book {
		string title;
		string author;
		bool completed;
	}

	// Array of books
	Book[] public books;

	function add1(string memory _title, string memory _author) public {
		books.push(Book(_title, _author, false));
	}

	function add2(string memory _title, string memory _author) public {
		books.push(Book({title: _title, author: _author, completed: false}));
	}

	function add3(string memory _title, string memory _author) public {
		Book memory book;
		book.title = _title;
		book.author = _author;
		// completed is "false" by default

		books.push(book);
	}

	function get(uint _index)
		public
		view
		returns (string memory title, string memory author, bool completed)
	{
		Book storage book = books[_index];
		return(book.title, book.author, book.completed);
	}

	// Update completed
	function complete(uint _index) public {
		Book storage book = books[_index];
		book.completed = true;
	}
}
