import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { FaSearch } from 'react-icons/fa';
import { Header, Form, FormButton, FormInput } from './Searchbar.styled';

export const Searchbar = function Searchbar ({ onSubmit }) {
    const [query, setQuery] = useState('');
    

    const onChangeInput = e => {
        const { value } = e.currentTarget;
        setQuery(value);
    };

    const onSubmitForm = e => {
        e.preventDefault();

        if (query.trim() === '') {
        toast.error('Enter a search term.', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',   
        });
        return;
    }

        onSubmit(query);
    };

    return (
        <Header>
            <Form onSubmit={onSubmitForm}>
            <FormButton type="submit">
                <FaSearch size={12} />
            </FormButton>

            <FormInput
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                value={query}
                onChange={onChangeInput}
            />
            </Form>
        </Header>
    );
}
Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };