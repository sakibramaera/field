import { registerEnumType } from '@nestjs/graphql';

export enum CustomerDirection {
  // Specifies an ascending order for a given `orderBy` argument.
  asc = 'asc',
  // Specifies a descending order for a given `orderBy` argument.
  desc = 'desc',
}

registerEnumType(CustomerDirection, {
  name: 'CustomerDirection',
  description:
    'Possible directions in which to order a list of items when provided an `orderBy` argument.',
});
