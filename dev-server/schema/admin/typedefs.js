import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type User {
    id: ID
    name: String
    email: String!
    password: String!
    contactNumber: [Int]
    joinedDate: String
    status: String
    message: String
  }

  type Me {
    name: String
    email: String
    role: String
  }

  type Product {
    id: ID
    title: String!
    description: String
    price: Int
    category: [Category]
    image: String
    imagePath: String
  }

  # type AddProductRes {
  #   id: ID
  #   title: String!
  #   description: String
  #   price: Int
  #   category: [{
  #     id: ID
  #   }]
  #   image: String
  #   imagePath: String
  # }

  type AuthPayload {
    token: String
    user: Me
  }

  type Category {
    id: ID
    name: String!
    slug: String
  }

  type AllCategory {
    result: Int
    items: [Category]
  }

  input ProductInput {
    title: String!
    description: String
    price: Int
    image: Upload
    category: [ID]
  }

  type allProducts {
    result: Int
    items: [Product]
  }

  type Response {
    status: String
    message: String
    id: ID
  }

  type Query {
    me: Me
    getProduct(id: ID!): Product
    products: allProducts
    category: AllCategory
  }

  type Mutation {
    signup(name: String, email: String!, password: String!, contactNumber: [Int]): User
    login(email: String!, password: String!): AuthPayload
    addProduct(input: ProductInput): Product
    updateProduct(id: ID, input: ProductInput): Product
    deleteProduct(id: ID!): Response

    addCategory(name: String!): Category
    deleteCategory(id: ID!): Response
    updateCategory(id: ID!, name: String!): Category
  }
`;

export default typeDefs;
