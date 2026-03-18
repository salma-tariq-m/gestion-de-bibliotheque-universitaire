using LibraryApi.DTOs;
using LibraryApi.Models;
using LibraryApi.Repositories;
using Microsoft.EntityFrameworkCore;

namespace LibraryApi.Services
{
    public class BookService
    {
        private readonly BookRepository _repository;

        public BookService(BookRepository repository)
        {
            _repository = repository;
        }

        // Récupérer un livre par ID
        public async Task<Livre?> GetBookById(int id_livre)
        {
            return await _repository.GetByIdAsync(id_livre);
        }

        // Récupérer tous les livres avec le nom de la catégorie
        public async Task<List<BookWithCategorieDto>> GetAllBooks()
        {
            return await _repository.GetAllWithCategorieDtoAsync();
        }

        // Ajouter un livre
        public async Task CreateBook(BookDto dto)
        {
            if (dto.Quantite < 0)
                throw new Exception("La quantité ne peut pas être négative");

            var book = new Livre
            {
                Titre = dto.Titre,
                Auteur = dto.Auteur,
                Quantite = dto.Quantite,
                Annee = dto.Annee,
                Id_Categorie = dto.Id_Categorie
            };

            await _repository.AddAsync(book);
        }

        // Modifier un livre
        public async Task<bool> UpdateBook(int id_livre, BookDto dto)
        {
            var book = await _repository.GetByIdAsync(id_livre);
            if (book == null) return false;

            book.Titre = dto.Titre;
            book.Auteur = dto.Auteur;
            book.Quantite = dto.Quantite;
            book.Annee = dto.Annee;
            book.Id_Categorie = dto.Id_Categorie;

            await _repository.UpdateAsync(book);
            return true;
        }

        // Supprimer un livre
        public async Task<bool> DeleteBook(int id_livre)
        {
            var book = await _repository.GetByIdAsync(id_livre);
            if (book == null) return false;

            await _repository.DeleteAsync(book);
            return true;
        }
    }
}