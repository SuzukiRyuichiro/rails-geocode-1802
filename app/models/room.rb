class Room < ApplicationRecord
  belongs_to :flat

  acts_as_list scope: :flat
end
