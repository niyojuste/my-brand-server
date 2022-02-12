import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Juste-brand API',
            description: 'Personal portfolio and blog API',
            version: '1.0.0'
        },
        security: [{
            'bearerAuth': []
        }],
        paths: {
          '/api/users': {
            post: {
              tags: [
                'users'
              ],
              security: [],
              summary: 'user signup',
              requestBody: {
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/User'
                    },
                  }
                }
              },
              responses: {
                '201': {
                  content: {
                    'application/json': {
                      schema: {
                        $ref: '#/components/schemas/User'
                      }
                    }
                  },
                  description: 'User created successfully',
                },
                '400': {
                  description: 'Bad request, invalid input(s)'
                }
              }
            },
            get: {
              tags: [ 
                'users',
                'admins'
              ],
              summary: 'Fetch all users',
              description: 'List of all users fetched by admin',
              reponses: {
                '200': {
                  content: {
                    'application/json': {
                      schema: {
                        type: 'array',
                        items: {
                          $ref: '#/components/schema/User'
                        }
                      }
                    }
                  }
                },
                '401': {
                  $ref: '#/components/responses/UnauthenticatedUser'
                },
                '403': {
                  description: 'Not allowed'
                }
              }
            }
          },
          '/api/login': {
            post: {
              tags: [
                "users"
              ],
              security: [],
              summary: 'User login',
              description: 'User login with username and password',
              requestBody: {
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        'username': { 
                          type: 'string'
                        },
                        password: {
                          type: 'string'
                        }
                      }
                    }
                  }
                }
              },
              responses: {
                '200': {
                  descritiopn: 'successful login'
                },
                '400': {
                  description: 'Bad request / invalid input'
                }
              }
            }
          },
          '/api/logout': {
            get: {
              tags: [
                'users'
              ],
              summary: 'User logout',
              responses: {
                '200': {
                  description: 'Logged out successfully'
                },
                '401': {
                  $ref: '#/components/responses/UnauthenticatedUser'
                }
              }
            }
          },
          '/api/logoutAll': {
            get: {
              tags: [
                'users'
              ],
              summary: 'Logs out user everywhere',
              responses: {
                '200': {
                  description: 'successfully logged out everywhere'
                },
                '401': {
                  $ref: '#/components/responses/UnauthenticatedUser'
                }
              }
            }
          },
          '/api/users/me': {
            get: {
              tags: [
                'users'
              ],
              summary: 'Fetch logged in user',
              responses: {
                '200': {
                  content: {
                    'application/json': {
                      schema: {
                        $ref: '#/components/schemas/User'
                      }
                    }
                  }
                },
                '401': {
                  $ref: '#/components/responses/UnauthenticatedUser'
                }
              }
            },
            patch: {
              tags: [
                'users'
              ],
              summary: 'Logged in user profile update',
              requestBody: {
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/User_Partial'
                    }
                  }
                }
              },
              responses: {
                '200': {
                  description: 'User successfully updated their profile'
                },
                '400': {
                  description: 'Bad request / invalid input'
                },
                '401': {
                  $ref: '#/components/responses/UnauthenticatedUser'
                }
              }
            }
          },
          '/api/users/{id}': {
            get: {
              tags: [
                'users',
                'admins'
              ],
              summary: 'Fetch specified user',
              description: 'Admin view of a specified user',
              parameters: [{
                $ref: '#/components/parameters/id'
              }],
              responses: {
                '200': {
                  content: {
                    'application/json': {
                      schema: {
                        $ref: '#/components/schemas/User'
                      }
                    }
                  }
                },
                '400': {
                  $ref: '#/components/responses/NotFound',
                },
                '401': {
                  $ref: '#/components/responses/UnauthenticatedUser'
                },
                '403': {
                  description: 'Not allowed'
                },
                '404': {
                  $ref: '#/components/responses/NotFound'
                }
              }
            },
            delete: {
              tags: [
                'users',
                'admins'
              ],
              summary: 'User deletion',
              parameters: [{
                $ref: '#/components/parameters/id'
              }],
              responses: {
                '202': {
                  description: 'User deleted successfully',
                },
                '401': {
                  $ref: '#/components/responses/UnauthenticatedUser'
                },
                '403': {
                  description: 'Not allowed'
                },
                '404': {
                  $ref: '#/components/responses/NotFound'
                }
              }
            }
          },
          '/api/posts': {
            get: {
              security: [],
              tags: [
                'posts'
              ],
              summary: 'Get all posts',
              responses: {
                '200': {
                  description: 'Success',
                  content: {
                    'application/json': {
                      schema: {
                        type: 'array',
                        items: { 
                          $ref: '#/components/schemas/Post'
                        }
                      }
                    }
                  }
                },
                '500': {
                  description: 'Internal server error'
                }
              }
            },
            post: {
              tags: [
                'posts'
              ],
              summary: 'New Article Create',
              description: 'Creates a new post',
              requestBody: {
                required: true,
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        title: {
                          type: 'string',
                          required: true
                        },
                        body: {
                          type: 'string',
                          required: true
                        },
                        image: {
                          type: 'string',
                          required: true
                        },
                      }
                    }
                  }
                },
                description: 'Create a new article'
              },
              responses: {
                201: {
                  content: {
                    'application/json': {
                      schema: {
                        $ref: '#/components/schemas/Post'
                      }
                    }
                  },
                  description: 'Post is created'
                },
                400: {
                  description: 'Invalid input'
                },
                401: {
                  $ref: '#/components/responses/UnauthenticatedUser'
                }
              }
            },
            patch: {
              tags: [
                'posts'
              ],
              summary: 'Existing article update',
              description: 'Updates an existing post',
              parameters: [{
                $ref: '#/components/parameters/id'
              }],
              requestBody: {
                required: true,
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        title: {
                          type: 'string'
                        },
                        body: {
                          type: 'string'
                        },
                        image: {
                          type: 'string'
                        }
                      }
                    }
                  }
                }
              },
              responses: {
                200: {
                  content: {
                    'application/json': {
                      schema: {
                        $ref: '#/components/schemas/Post'
                      }
                    }
                  },
                  description: 'Post is updated'
                },
                400: {
                  description: 'Invalid input'
                },
                401: {
                  $ref: '#/components/responses/UnauthenticatedUser'
                },
                404: {
                  $ref: '#/components/responses/NotFound'
                }
              }
            }
          },
          '/api/posts/me': {
            get: {
              tags: [
                'posts'
              ],
              summary: 'Get all posts of logged in user',
              responses: {
                200: {
                  description: 'Success',
                  content: {
                    'application/json': {
                      schema: {
                        type: 'array',
                        items: {
                          $ref: '#/components/schemas/Post'
                        }
                      }
                    }
                  }
                },
                401: {
                  $ref: '#/components/responses/UnauthenticatedUser'
                },
                500: { 
                  description: 'Internal server error'
                }
              }
            }
          },
          '/api/posts/{id}/likes': {
            patch: {
              tags: [
                'posts'
              ],
              summary: 'changes like reaction',
              description: 'Like or unlike the specified article',
              parameters: [{
                $ref: '#/components/parameters/id'
              }],
              responses: {
                200: {
                  description: 'like status updated'
                },
                401: {
                   $ref: '#/components/responses/UnauthenticatedUser'
                },
                404: {
                   $ref: '#/components/responses/NotFound'
                }
              }
            }
          },
          '/api/posts/{id}/comments': {
            post: {
              tags: [
                'posts'
              ],
              summary: 'Add comment to an article',
              description: 'Add a comment to a particular article from an authenticated user',
              parameters: [{
                $ref: '#/components/parameters/id'
              }],
              responses: {
                200: {
                  description: 'Comment successfully added'
                },
                401: {
                  $ref: '#/components/responses/UnauthenticatedUser'
                },
                404: {
                  $ref: '#/components/responses/NotFound'
                }
              }
            }
          },
          '/api/posts/{id}': {
            get: {
              security: [],
              tags: [
                'posts'
              ],
              summary: 'Get single post',
              parameters: [{
                $ref: '#/components/parameters/id'
              }],
              responses: {
                200: {
                  description: 'Success',
                  content: {
                    'application/json': {
                      schema: {
                        $ref: '#/components/schemas/Post'
                      }
                    }
                  }
                },
                404: {
                  $ref: '#/components/responses/NotFound'
                },
                500: {
                  description: 'Internal server error'
                }
              }
            },
            delete: {
              tags: [
                'posts',
                'admins'
              ],
              description: 'Deletes an article',
              parameters: [{
                $ref: '#/components/parameters/id'
              }],
              responses: {
                202: {
                  description: 'successful delete'
                },
                401: {
                  $ref: '#/components/responses/UnauthenticatedUser'
                },
                403: {
                  description: 'Not authorized'
                },
                404: {
                  $ref: '#/components/responses/NotFound'
                }
              }
            }
          },
          '/api/queries': {
            post: {
              tags: [ 
                'queries'
              ],
              summary: 'Add query',
              requestBody: {
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/Query_Partial'
                    }
                  }
                }
              },
              responses: {
                201: {
                  description: 'Success'
                }
              }
            },
            get: {
              tags: [
                'queries',
                'admins'
              ],
              summary: 'Fetch all queries',
              responses: {
                200: {
                  content: {
                    'application/json': {
                      schema: {
                        $ref: '#/components/schemas/Query'
                      }
                    }
                  }
                },
                '401': {
                  $ref: '#/components/responses/UnauthenticatedUser'
                },
                '403': {
                  description: 'Not allowed'
                }
              }
            }
          },
          '/api/queries/{id}': {
            get: {
              tags: [
                'queries',
                'admins'
              ],
              summary: 'Fetch a single query',
              responses: {
                200: {
                  content: {
                      'application/json': {
                        schema: {
                          $ref: '#/components/schemas/Query'
                        }
                      }
                  }
                },
                '401': {
                  $ref: '#/components/responses/UnauthenticatedUser'
                },
                '403': {
                  description: 'Not allowed'
                },
                '404': {
                  $ref: '#/components/responses/NotFound'
                }
              }
            }
          }
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            },
            parameters: {
                id: {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {
                        type: 'string',
                        example: '62013ffbbb9c617c353350e4'
                    }
                }
            },
            responses: {
                UnauthenticatedUser: {
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    error: {
                                        type: 'string',
                                        example: 'Unauthenticated'
                                    }
                                }
                            }
                        }
                    },
                    description: 'Missing or invalid token'
                },
                NotFound: {
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    error: {
                                        type: 'string',
                                        example: 'Not found'
                                    }
                                }
                            }
                        }
                    },
                    description: 'Resource not found'
                },
            },
            schemas: {
                Post: {
                    type: 'object',
                    properties: {
                        _id: {
                          type: 'string'
                        },
                        title: {
                          type: 'string'
                        },
                        body: {
                          type: 'string'
                        },
                        image: {
                          type: 'string'
                        },
                        user: {
                          type: 'string'
                        },
                        likes: {
                          type: 'array',
                          items: {
                            type: 'string'
                          }
                        },
                        comments: {
                          type: 'array',
                          items: {
                            type: 'object',
                            properties: {
                              user: {
                                type: 'string'
                              },
                              comment: {
                                type: 'string'
                              }
                            }
                          }
                        },
                        createdAt: {
                          type: 'string'
                        },
                        updatedAt: {
                          type: 'string'
                        },
                        __v: {
                          type: 'number'
                        }
                    }
                },
                User: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string'
                        },
                        name: {
                            type: 'string'
                        },
                        email: {
                            type: 'string'
                        },
                        username: {
                            type: 'string'
                        },
                        password: {
                            type: 'string'
                        },
                        avatar: {
                            type: 'string'
                        },
                        location: {
                            type: 'object',
                            properties: {
                                longitude: {
                                    type: 'number'
                                },
                                latitude: {
                                    type: 'number'
                                }
                            }
                        },
                        __v: {
                            type: 'number'
                        },
                        createdAt: {
                            type: 'string'
                        },
                        updatedAt: {
                            type: 'string'
                        }
                    }
                },
                User_Partial: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string'
                        },
                        email: {
                            type: 'string'
                        },
                        username: {
                            type: 'string'
                        },
                        password: {
                            type: 'string'
                        },
                        avatar: {
                            type: 'string'
                        },
                        location: {
                            type: 'object',
                            properties: {
                                longitude: {
                                    type: 'number'
                                },
                                latitude: {
                                    type: 'number'
                                }
                            }
                        }
                    }
                },
                Query: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string'
                        },
                        name: {
                            type: 'string'
                        },
                        email: {
                            type: 'string'
                        },
                        tel: {
                            type: 'string'
                        },
                        query: {
                            type: 'string'
                        }
                    }
                }
            }
        }
    },
    apis: []
}

const swaggerSpec = swaggerJSDoc(options)

function swaggerDocs(app, port) {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

    app.get('/docs.json', (req, res) => {
        res.setHeader('Content-type', 'application/json')
        res.send(swaggerSpec)
    })
}

export default swaggerDocs